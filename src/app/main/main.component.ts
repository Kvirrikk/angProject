import { Component } from '@angular/core';
import { UserService } from '../Services/product/product.service';
import { Router } from '@angular/router';
import { Products } from '../Models/Product';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ApiService } from '../Services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {


  basket: any[] = []
  products: Products[] = []
  category: any[] = []
  selectedCategoryId: number | null = null



  constructor(
    private api : UserService, 
    private router: Router,
    private productService: UserService,  
    private apiService: ApiService,
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
    

    getBasket() {
      this.apiService.getBasket().subscribe((resp) => {
        this.basket = resp;
      });
    }

    addToBasket(product: any) {
      let existing = this.basket.find(p => p.productId === product.id);
      if (existing) {
        this.updateQuantity(existing, 1);
      } else {
        let newItem = {
          productId: product.id,
          name: product.name,
          quantity: 1,
          price: product.price
        };
        this.apiService.addToBasket(newItem).subscribe(() => {
          this.basket.push(newItem);
        });
      }
    }
    
    updateQuantity(item: any, change: number) {
      let newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        this.apiService.deleteProductFromBasket(item.productId).subscribe(() => {
          this.basket = this.basket.filter(p => p.productId !== item.productId);
        });
      } else {
        item.quantity = newQuantity;
        
  
        let unitPrice = item.originalPrice ?? (item.price / (item.quantity - change));
        item.originalPrice = unitPrice; 
        item.price = unitPrice * newQuantity;
    
        this.apiService.updateBasket({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }).subscribe();
      }
    }

    removeFromBasket(id: number) {
      this.apiService.deleteProductFromBasket(id).subscribe(() => {
        this.getBasket();
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
