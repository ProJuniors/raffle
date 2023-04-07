import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/user-data';
import { GetDataService } from 'src/app/services/get-data.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.css']
})

export class PaymentformComponent implements OnInit {

  URL = "http://localhost:3000/raffle-api/get-link"
  paymentLink: any = ""

  item = {
    title: 'Mi producto',
    unit_price: 5000,
    quantity: 1
  }
  preference = {
    items: [
      this.item
    ]
  }

  hiddens = {
    name: "hidden",
    lastName: "hidden",
    city: "hidden",
    phoneNumber: "hidden",
    email: "hidden"
  }

  regexOnlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?$/
  regexCity = /^([a-zA-ZáéíóúÁÉÍÓÚ0-9]|[a-zA-ZáéíóúÁÉÍÓÚ0-9][a-zA-ZáéíóúÁÉÍÓÚ0-9\s]+)$/
  regexPhome = /^([0-9]{10})$/
  regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  errorsMsg = {
    name: "Ingrese un nombre valido.",
    lastName: "Ingrese un apellido valido.",
    city: "Ingrese una ciudad valida.",
    phoneNumber: "Ingrese un numero de telefono valido.",
    email: "Ingrese un email valido."
  }

  requiredMsg = {
    name: "Nombre requerido.",
    lastName: "Apellido requerido.",
    city: "Ciudad requerida.",
    phoneNumber: "Telefono requerido.",
    email: "Email requerido."
  }

  constructor (private getDataService: GetDataService, private storageService: StorageServiceService) {}

  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern(this.regexOnlyLetters)]),
    lastName: new FormControl("", [Validators.required, Validators.pattern(this.regexOnlyLetters)]),
    city: new FormControl("", [Validators.required, Validators.pattern(this.regexCity)]),
    phoneNumber: new FormControl("", [Validators.required, Validators.pattern(this.regexPhome)]),
    email: new FormControl("", [Validators.required, Validators.pattern(this.regexEmail)]),
  })

  ngOnInit(): void {
    this.getDataService.getData().subscribe((data) => {
      this.item.unit_price = (<Product>data).unitPrice
      this.item.title = (<Product>data).name
    })
    this.storageService.loadStorage()
    this.item.quantity = this.storageService.totalNumber
    this.getDataService.doPost(this.URL, {preference: this.preference})
    .subscribe((data) => {
      this.paymentLink = data
    })
  }

  sendData = () => {
    const keys: string[] = Object.keys(this.requiredMsg)

    if(this.form.invalid) {
      keys.forEach(key => {
        const hiddenObj = this.hiddens
        const input = this.form.get(key)
        if(!input?.touched && input?.value === "") {
          this.hiddens[key as keyof typeof hiddenObj] = ""
        }
      })
    } else {
      window.location = this.paymentLink
    }
  }

  messageError(input: string) {
    const validate = this.form.get(input);
    const isTouched = validate?.touched;
    const isValid = validate?.valid;
    if(validate?.value === "" && isTouched) {
      this.hideInput(input)
      return false
    }
    if(validate?.value === "") {
      return true
    }
    if(validate?.value !== "" && isValid) {
      this.hideInput(input)
      return true
    }
    this.hideInput(input)
    return false
  }

  hideInput = (input: string) => {
    const hiddenObj = this.hiddens
    const key = input as keyof typeof hiddenObj

    if(this.hiddens[key] === "") {
      console.log("In")
      this.hiddens[key] = "hidden"
    }
  }
}
