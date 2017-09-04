import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ApiBaseUrl } from 'app';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  constructor(private http: Http, private router: Router) {}
  // private user: User;

  // private setUser(user) {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.user = user;
  // }

  login(data) {
    return this.http.post(`${ApiBaseUrl}/login`, data).map(user => {
      // this.setUser(user.json());
      // return user.json()
    });
  }

  // logout() {
  //   localStorage.removeItem('user');
  // }

  // getUser() {
  //   if (!this.user) {
  //     if (localStorage.getItem('user')) {
  //       // for some reason user has been removed from localStorage, try to recover it
  //       this.setUser(JSON.parse(localStorage.getItem('user')));
  //       return this.user;
  //     } else {
  //       this.router.navigate(['/login']);
  //     }
  //   } else {
  //     return this.user;
  //   }
  // }

  // getAccessToken() {
  //   if (this.user) {
  //     return !!this.user.access_token;
  //   }
  // }
}
