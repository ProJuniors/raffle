import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  unitPrice = 5000
  cards = [
    {
      index: 0, quantity: 2, price: this.formatToMoney(this.unitPrice * 2)
    },
    {
      index: 1, quantity: 5, price: this.formatToMoney(this.unitPrice * 5)
    },
    {
      index: 2, quantity: 10, price: this.formatToMoney(this.unitPrice * 10)
    },
    {
      index: 3, quantity: 50, price: this.formatToMoney(this.unitPrice * 50)
    },
    {
      index: 4, quantity: 100, price: this.formatToMoney(this.unitPrice * 100)
    }
  ]

  constructor() { }

  formatToMoney(num: any) {
    const formatNumber = new Intl.NumberFormat("es-ES", {maximumSignificantDigits: 3}).format(num)
    return formatNumber
  }

  getData = () => {
    return this.cards
  }
}
