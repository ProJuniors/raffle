import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  URL_GET_DATA: string = "https://raffle-serve-production.up.railway.app/raffle-api/raffle-active"
  producName = ""
  unitPrice = 0
  cards = []

  constructor(private http: HttpClient) { }

  formatToMoney(num: any) {
    const formatNumber = new Intl.NumberFormat("es-ES", {maximumSignificantDigits: 3}).format(num)
    return formatNumber
  }

  doPost = (url: string, data: any) => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })
    return this.http.post(url, data, {headers})
  }

  doGet = (url: string) => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    })
    return this.http.get(url, {headers})
  }

  getData = () => {
    return this.doGet(this.URL_GET_DATA)
  }
}
