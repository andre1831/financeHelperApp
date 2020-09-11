import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/services/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticated: Observable<boolean>;

  constructor(private app: AppService, private router: Router, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.authenticated = this.app.isLoggedIn();
  }

  logout() {
    this.app.logOut();
    this.token.signOut();
    this.router.navigateByUrl('/login');
  }

}
