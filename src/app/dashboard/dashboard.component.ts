import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/services/token-storage.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  formControl = new FormControl();
  products: any;
  productInfo: any;
  followedProducts: any;
  showTable = false;
  authenticated: Observable<boolean>;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private token: TokenStorageService,
              private app: AppService , private router: Router) { }

  ngOnInit(): void {
    this.authenticated = this.app.isLoggedIn();
    if (!this.authenticated){
      this.router.navigateByUrl('/login');
    }
    this.buildForm();
    this.http.get('http://localhost:8080/products-list').subscribe((data) => this.products = data);
    this.http.post('http://localhost:8080/followed-products', {username: this.token.getUser()}).
      subscribe((data) => {
        this.followedProducts = data;
        if (data != null){
            this.showTable = true;
        }
      });

  }

  buildForm() {
    this.form = this.formBuilder.group({
      product: [null],
    });
  }
  addProduct(){
    this.http.post('http://localhost:8080/add-product', {username: this.token.getUser(), product: this.form.get('product').value}).
      subscribe((data) => {
        this.followedProducts = data;
        if (data != null){
            this.showTable = true;
        }
      });
  }
  deleteProduct(selectedProduct: any){
    this.http.post('http://localhost:8080/delete-product', {userProductResponse: selectedProduct}).
      subscribe((data) => {
        this.followedProducts = data;
        if (data != null){
            this.showTable = true;
        }else{
          this.showTable = false;
        }
      });
  }
  getProduct(selectedProduct: any){
    this.router.navigate(['product'] , selectedProduct);
  }

}
