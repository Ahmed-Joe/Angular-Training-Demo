import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private isLoggedSubject: BehaviorSubject<boolean>;
  constructor() {
    // this.isLoggedSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedSubject = new BehaviorSubject<boolean>(false); // this.isUserLogged >< false
  }
  login(userName: string, password: string) {
    // call login API, and access token
    let userToken = '123456789';
    localStorage.setItem('token', userToken);
    this.isLoggedSubject.next(true);
  }
  logout() {
    localStorage.removeItem('token');
    this.isLoggedSubject.next(false);
  }

  // get here to make it property instead of finction, that is from typrScript syntax
  get isUserLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  getLoggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}
