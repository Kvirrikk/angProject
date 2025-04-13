import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http : HttpClient) { }


  addToBasket(productId : number, quantity : number, price : number) {
    return this.http.post("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {productId, quantity, price})
  }

  
  updateBasket(productId : number, quantity : number, price : number) {
    return this.http.put("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {productId, quantity, price})
  }

  
  getBasket() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  }

  deleteFromBasket(id: number) {
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`)
  }
}
