import { Injectable, OnInit } from '@angular/core';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService implements OnInit {

  totalNumber: number = 0
  selectedIndex: number = 0
  storageKey: string = "cart-data"
  userData: UserData = {name: "", lastName: "", address: "", phoneNumber: "", email: ""}
  userDataDefault: UserData = {name: "", lastName: "", address: "", phoneNumber: "", email: ""}

  constructor() { }

  ngOnInit(): void {
    this.loadStorage()
  }

  storageExist = () => {
    if(localStorage.getItem(this.storageKey)) return true
    return false
  }

  createStorage = (index: number, total: number, user: UserData) => {
    const data = {index, total, user}
    localStorage.setItem(this.storageKey, JSON.stringify(data))

    this.totalNumber = total
    this.userData = user
  }
  loadStorage = () => {
    const storageExists = localStorage.getItem(this.storageKey)
    if(storageExists) {
      const data = JSON.parse(storageExists)
      this.totalNumber = data.total
      this.userData = data.user
      this.selectedIndex = data.index
    } else {
      this.createStorage(0, 2, this.userDataDefault)
    }
  }

  updateTotal = (index: number, total: number) => {
    const storageExists = localStorage.getItem(this.storageKey)
    if(storageExists) {
      const data = JSON.parse(storageExists)
      data.index = index
      data.total = total
      localStorage.setItem(this.storageKey, JSON.stringify(data))
      this.totalNumber = data.total
    }
  }

  updateUser = (user: UserData) => {
    const storageExists = localStorage.getItem(this.storageKey)
    if(storageExists) {
      const data = JSON.parse(storageExists)
      data.user = user
      localStorage.setItem(this.storageKey, JSON.stringify(data))
      this.userData = data.user
    }
  }

  deleteStorage = () => {
    localStorage.removeItem(this.storageKey)
  }
}
