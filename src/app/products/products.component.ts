
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  form: FormGroup;
  formControl = new FormControl();
  products: {};
  isAuthenticated: boolean;
  showTable = false;
  productInfo: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.buildForm();
    this.http.get('http://localhost:8080/products-list').subscribe((data) => this.products = data);
    this.form.get('product').valueChanges.subscribe(selectedProduct => this.getProductInfo(selectedProduct));
  }
  buildForm() {
    this.form = this.formBuilder.group({
      product: [null],
    });
  }

  getProductInfo(selectedProduct){
    this.http.post('http://localhost:8080/product-info', {symbol: selectedProduct}).subscribe((data) => {
      this.productInfo = data;
      this.showTable = true;
    });
  }
}
