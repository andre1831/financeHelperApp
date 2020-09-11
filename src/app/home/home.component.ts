
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  authenticated: Observable<boolean>;


  constructor(private app: AppService) { }

  ngOnInit(): void {
    this.authenticated = this.app.isLoggedIn();
  }

}
