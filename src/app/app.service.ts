import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppService {

   logger = new Subject<boolean>();
   token = '';

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
    const headers = new HttpHeaders(credentials ? {
            user : credentials.username,
            password : credentials.password,
        } : {});

    this.http.get<any>('http://localhost:8080/login', {headers, observe: 'response'}).subscribe(resp => {
            this.logger.next(true);
            this.token = resp.headers.get('authorization');
            return callback && callback();
        });

    }
    isLoggedIn(): Observable<boolean> {
        return this.logger.asObservable();
      }
    logOut() {
         this.logger.next(false);
    }

}
