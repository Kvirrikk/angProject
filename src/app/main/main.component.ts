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



  products: Products[] = []
  category: any[] = []
  selectedCategoryId: number | null = null



  constructor(
    private api : UserService, 
    private router: Router,
    private productService: UserService,  
    private apiService: ApiService){ }




    filters = {
      vegeterian: null as boolean | null,
      nuts: null as boolean | null,
      spiciness: null as number | null,
      categoryId: null as number | null
    }
    
    applyFilters() {
      let params: any = {}
    
      if (this.filters.vegeterian !== null) params.vegeterian = this.filters.vegeterian
      if (this.filters.nuts !== null) params.nuts = this.filters.nuts
      if (this.filters.spiciness !== null) params.spiciness = this.filters.spiciness
      if (this.filters.categoryId !== null) params.categoryId = this.filters.categoryId
    
      this.apiService.getFiltered(params).subscribe((resp) => {
        this.products = resp
      })
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
        this.products = resp;
        console.log(resp);

        this.productService.getProdCategory().subscribe((resp) => {
          this.category = resp;
        })
        
      })
  }

}
