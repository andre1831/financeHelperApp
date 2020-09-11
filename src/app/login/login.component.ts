import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = {username: '', password: ''};

  constructor(private app: AppService, private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService) {
  }

  login() {
    this.app.authenticate(this.credentials, () => {
        this.tokenStorage.saveToken(this.app.token);
        this.tokenStorage.saveUser(this.credentials.username);
        this.router.navigateByUrl('/home');
    });
    return false;
  }

}
