import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as FusionCharts from 'fusioncharts';

const dataUrl =
'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json';
const schemaUrl = 'assets/json/schema.json';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  form: FormGroup;
  formControl = new FormControl();
  attributes: any;
  alarms: any;
  showTable = false;
  showForm = false;
  dataSource: any;
  type: string;
  width: string;
  height: string;

  followedProduct: any;

  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) {
    this.followedProduct = this.router.getCurrentNavigation().extras;
    this.http.get('http://localhost:8080/get-attributes').subscribe((data) => this.attributes = data);
    this.http.post('http://localhost:8080/get-alarms', {userProduct: this.followedProduct.userProduct}).
    subscribe((data) => {
      this.alarms = data;
      if (data != null){
        this.showTable = true;
      }
    });
    this.type = 'timeseries';
    this.width = '700';
    this.height = '400';
    this.dataSource = {
      data: null,
      caption: {
        text: 'Volumen'
      },
      subcaption: {
        text: this.followedProduct.userProduct
      },
      yAxis: [
        {
          plot: {
            value: this.followedProduct.userProduct + ' volumen',
            type: 'line'
          },
          title: 'Volumen'
        }
      ]
    };
    this.fetchData();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      userProduct: [this.followedProduct.userProduct],
      attribute: [null, null],
      maxVal: [null, null],
      minVal: [null, null],
    });
  }

  createAlarm(){
    this.http.post('http://localhost:8080/add-alarm', this.form.value).subscribe((data) => this.alarms = data);
    this.showForm = false;
  }

  deleteAlarm(selectedAlarm: any){
    this.http.post('http://localhost:8080/delete-alarm', {alarm: selectedAlarm}).
      subscribe((data) => {
        this.alarms = data;
        if (data != null){
            this.showTable = true;
        }else{
          this.showTable = false;
        }
      });
  }

  fetchData() {
    const jsonify = res => res.json();
    const dataFetch = fetch(dataUrl).then(jsonify);
    const schemaFetch = fetch(schemaUrl).then(jsonify);
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      ); // Instance of DataTable to be passed as data in dataSource
      this.dataSource.data = fusionTable;
    });
  }
}
