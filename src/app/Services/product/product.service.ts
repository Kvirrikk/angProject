import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : ApiService) { }

  getProducts() {
    return this.http.getApi("https://restaurant.stepprojects.ge/api/Products/GetAll")
}

  getProdCategory() {
    return this.http.getCategory("https://restaurant.stepprojects.ge/api/Categories/GetAll")
}

getProdCategoryId(cateId : number) {
  return this.http.getProdCategory(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${cateId}`)
}

}
