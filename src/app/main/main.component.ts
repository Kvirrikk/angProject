import { Component } from '@angular/core';
import { UserService } from '../Services/user/product.service';
import { Router } from '@angular/router';
import { Products } from '../Models/Product';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {


  constructor(private api : UserService, private router:Router ){ }

  products: Products[] = []



  products$ ? : Observable<any>

  ngOnInit(){
      this.products$ = this.api.getProducts();
      this.products$.subscribe(resp => {
          this.products = resp.data;
          console.log(resp.data)
      })
  }
}
