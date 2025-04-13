import { Component } from '@angular/core';
import { UserService } from '../Services/product/product.service';
import { Router } from '@angular/router';
import { Products } from '../Models/Product';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ApiService } from '../Services/api.service';
import { FormsModule } from '@angular/forms';
import { BasketService } from '../Services/basket.service';

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {



  products: Products[] = []
  category: any[] = []
  selectedCategoryId: number | null = null



  constructor(
    private api : UserService, 
    private router: Router,
    private productService: UserService,  
    private apiService: ApiService,
    private basketService : BasketService
  ){ }




    filters = {
      vegeterian: null as boolean | null,
      nuts: null as boolean | null,
      spiciness: null as number | null,
      categoryId: null as number | null
    }
    
    applyFilters() {
      let { vegeterian, nuts, spiciness, categoryId } = this.filters
    
      if (vegeterian === null && nuts === null && spiciness === null && categoryId === null) {
        this.api.getProducts().subscribe(resp => {
          this.products = resp
        })
        return;
      }
    
      let params: any = {}
      if (vegeterian !== null) params.vegeterian = vegeterian
      if (nuts !== null) params.nuts = nuts
      if (spiciness !== null) params.spiciness = spiciness
      if (categoryId !== null) params.categoryId = categoryId
    
      this.apiService.getFiltered(params).subscribe(resp => {
        this.products = resp
      });
    }
    

    addToTheBasket(product: any) {
      this.basketService.addToBasket(product.id, 1, product.price).subscribe(() => {
        console.log('Added to basket!')
      })
    }


    updateProductInBasket(product: any, newQuantity: number) {
      let newPrice = product.price * newQuantity;
      this.basketService.updateBasket(product.id, newQuantity, newPrice).subscribe(() => {
        console.log('Basket updated!');
      });
    }


    onCateSelect() {
      if (this.selectedCategoryId !== null) {
        this.productService.getProdCategoryId(this.selectedCategoryId).subscribe((resp) => {
          this.products = resp.products
        })
      } else {

        this.api.getProducts().subscribe((resp) => {
          this.products = resp 
        })
      }
    }



  products$ ? : Observable<any>

  ngOnInit(){
      this.products$ = this.api.getProducts();
      this.products$.subscribe(resp => {
        this.products = resp
        console.log(resp)

        this.productService.getProdCategory().subscribe((resp) => {
          this.category = resp
        })
        
      })
  }

}
