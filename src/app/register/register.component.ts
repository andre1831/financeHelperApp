import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { AutocompleteService } from 'src/services/autocomplete.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from 'src/services/user.service';
import { TokenStorageService } from 'src/services/token-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FORM_ERRORS } from './register-form.messages';
import { EMAIL_REGEXP } from '../utils/finance-helper.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  formControl = new FormControl();
  countries: {};
  cities: {};
  registered: Observable<boolean>;
  error: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
  ) { }
  @ViewChild(MatAutocompleteTrigger, { static: false,  })
  trigger: MatAutocompleteTrigger;

  ngOnInit(): void {
    this.buildForm();
    this.http.get('http://localhost:8080/countries-list').subscribe((data) => this.countries = data);
    this.form.get('country').valueChanges.subscribe(selectedCountry => this.getCities(selectedCountry));
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: [null, [
        Validators.required
      ]],
      birthdate: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      country: [null, [
        Validators.required
      ]],
      city: [null, [Validators.required]],
      adress: [null, [Validators.required]],
      zipcode: [null, [Validators.required]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.pattern(EMAIL_REGEXP),
      ]],
      password: [null, [Validators.required]],
    });
  }

  getCities(selectedCountry){
    this.http.post('http://localhost:8080/cities-list', {id: selectedCountry.id}).subscribe((data) => this.cities = data);
  }

  submitForm(){
    this.userService.register(this.form.value).subscribe(
      resp => {
          this.userService.logNewUser(this.form.value);
          this.router.navigateByUrl('/dashboard');
      },
      error => {
        this.error = 'No fue posible crear el usuario, verifique la información ingresada';
      }
    );
  }

  shouldDisplayErrors(inputName: string) {
    const control: FormControl = this.form.get(inputName) as FormControl;

    return control.touched && Object.keys(control.errors || {}).length > 0;
  }

  getErrorLabel(controlName: string) {
    const control: FormControl = this.form.get(controlName) as FormControl;
    const firstErrorKey = Object.keys(control.errors || {})[0];
    const errorMessage = FORM_ERRORS[controlName][firstErrorKey];

    return typeof errorMessage === 'function'
      ? errorMessage(control.errors[firstErrorKey])
      : '';
  }


}
