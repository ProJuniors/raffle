export interface UserData {
  name: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  email: string
}

export interface Card {
  index: number,
  quantity: number,
  price: string
}

export interface Product {
  name: string,
  description: string,
  unitPrice: number,
  cards: Card[]
}
