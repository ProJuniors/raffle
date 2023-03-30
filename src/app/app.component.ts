import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'raffle';
  unitPrice = 5000
  cards = [
    {
      quantity: 2, price: this.formatToMoney(this.unitPrice * 2)
    },
    {
      quantity: 5, price: this.formatToMoney(this.unitPrice * 5)
    },
    {
      quantity: 10, price: this.formatToMoney(this.unitPrice * 10)
    },
    {
      quantity: 50, price: this.formatToMoney(this.unitPrice * 50)
    },
    {
      quantity: 100, price: this.formatToMoney(this.unitPrice * 100)
    }
  ]
  selectedOption = this.cards[0];
  totalNumbers = 2
  imgProduct = "https://yamaha-mundoyamaha.com/wp-content/uploads/2022/06/XTZ150_motos_header.png"
  @ViewChild('asBar') bar!: ElementRef;
  @ViewChild('asTotal') total!: ElementRef;

  constructor(private renderer2: Renderer2, private elRef: ElementRef) {

  }

  ngAfterViewInit(): void {
    this.total.nativeElement.value = this.totalNumbers
  }
  update($event: any) {
    const number = parseInt($event.target.value)
    if(number > 0) {
      this.totalNumbers = $event.target.value
    }
  }
  blur($event: any) {
    if($event.target.value === "") {
      this.totalNumbers = 2
      this.total.nativeElement.value = this.totalNumbers
    }
  }

  updateChange($event: any) {
    const number = parseInt($event.target.value)
    if(number < 2) {
      this.totalNumbers = 2
      this.total.nativeElement.value = this.totalNumbers
    }
  }

  change() {
    const asBar = this.bar.nativeElement
    this.renderer2.setStyle(asBar, "width", "10%")
  }

  formatToMoney(num: any) {
    const formatNumber = new Intl.NumberFormat("es-ES", {maximumSignificantDigits: 3}).format(num)

    return formatNumber
  }

  // selectCard(event: Event) {
  //   console.log(this.article)
  // }
  selectCard(evento: any) {
    const targetInput = this.elRef.nativeElement.contains(evento.target) ? evento.target.children[0] : null

    if(targetInput) {
      targetInput.checked = true
    }
  }
  selectCardQuantity(evento: any) {
    const targetInput = this.elRef.nativeElement.contains(evento.target) ? evento.target.parentNode.children[0]: null
    if(targetInput) {
      targetInput.checked = true
    }
  }
}
