import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.css']
})

export class PaymentformComponent {

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

  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern(this.regexOnlyLetters)]),
    lastName: new FormControl("", [Validators.required, Validators.pattern(this.regexOnlyLetters)]),
    city: new FormControl("", [Validators.required, Validators.pattern(this.regexCity)]),
    phoneNumber: new FormControl("", [Validators.required, Validators.pattern(this.regexPhome)]),
    email: new FormControl("", [Validators.required, Validators.pattern(this.regexEmail)]),
  })

  sendData = () => {
    const keys: string[] = Object.keys(this.requiredMsg)

    keys.forEach(key => {
      const hiddenObj = this.hiddens
      const input = this.form.get(key)
      if(!input?.touched && input?.value === "") {
        this.hiddens[key as keyof typeof hiddenObj] = ""
      }
    })
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
