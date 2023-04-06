import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit{
  title = 'raffle';
  cards = this.dataService.getData()
  selectedCard = 0
  minNumbers = 2
  totalNumbers = this.minNumbers
  inputQuantity = this.minNumbers

  imgProduct = "https://yamaha-mundoyamaha.com/wp-content/uploads/2022/06/XTZ150_motos_header.png"
  @ViewChild('asBar') bar!: ElementRef;
  @ViewChild('asTotal') total!: ElementRef;
  @ViewChild('productSection') productSection!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private router: Router,
    private storageService: StorageServiceService,
    private dataService: GetDataService
    ) {}

  ngOnInit(): void {
    this.storageService.loadStorage()
    if(this.storageService.totalNumber !== 0) {
      this.selectedCard = this.storageService.selectedIndex
      if(this.storageService.selectedIndex === this.cards.length) {
        this.inputQuantity = this.storageService.totalNumber
      } else {
        this.totalNumbers = this.storageService.totalNumber
      }
    }
  }

  ngAfterViewInit(): void {
    this.total.nativeElement.value = this.totalNumbers
  }
  update(evento: any) {
    const number = parseInt(evento.target.value)
    if(number > 0) {
      this.inputQuantity = evento.target.value
    }
  }

  updateChange($event: any) {
    const number = parseInt($event.target.value)
    if(number < 2) {
      this.inputQuantity = 2
    }
  }

  // change() {
  //   const asBar = this.bar.nativeElement
  //   this.renderer.setStyle(asBar, "width", "10%")
  // }




  //Esto es solo es para seleccionar tarjetas
  selectCard(evento: any, quantity: number, i: number) {
    const targetInput = this.elRef.nativeElement.contains(evento.target) ? evento.target.children[0] : null

    if(targetInput) {
      targetInput.checked = true
      this.selectedCard = i
      this.totalNumbers = quantity
    }
  }

  //Detecta el click encima del input
  selectCardQuantity(evento: any) {
    const targetInput = this.elRef.nativeElement.contains(evento.target) ? evento.target.parentNode.children[0]: null
    const value = this.elRef.nativeElement.contains(evento.target) ? evento.target.value : null

    if(targetInput) {
      targetInput.checked = true
      this.selectedCard = this.cards.length
      this.inputQuantity = value
    }

  }

  saveAndRedirect() {
    const cardExists = this.cards.find((card, index) => index === this.selectedCard)

    if(cardExists) {
      this.storageService.updateTotal(this.selectedCard, this.totalNumbers)
    } else {
      this.storageService.updateTotal(this.selectedCard, this.inputQuantity)
    }
    this.router.navigate(["/finalizar-compra"]);
    window.scrollTo(0, 0);
  }

  scrollToSection() {
    const section = this.productSection.nativeElement;
    if(section) {
      this.renderer.selectRootElement(section).scrollIntoView({ behavior: "smooth"});
    }
  }
}
