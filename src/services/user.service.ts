import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from './token-storage.service';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    token = '';
    registered = new Subject<boolean>();
    constructor(private http: HttpClient, private app: AppService,
                private tokenStorage: TokenStorageService ) { }

    register(user: User) {
         return this.http.post('http://localhost:8080/new-investor', user, {observe: 'response'});
    }
    logNewUser(user: User){
        const credentials = {username: user.email, password: user.password};
        this.app.authenticate(credentials, () => {
                    this.tokenStorage.saveToken(this.app.token);
                });
    }

}
