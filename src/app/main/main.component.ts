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

    onCateSelect() {
      if (this.selectedCategoryId !== null) {
        this.productService.getProdCategoryId(this.selectedCategoryId).subscribe((resp) => {
          this.products = resp.products
        });
      } else {

        this.api.getProducts().subscribe((resp) => {
          this.products = resp 
        });
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
        });
        
      });
  }

}
