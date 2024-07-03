import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../Services/user-auth.service';

@Component({
  selector: 'app-UserLogin',
  templateUrl: './UserLogin.component.html',
  styleUrls: ['./UserLogin.component.css'],
})
export class UserLoginComponent implements OnInit {
  isUserlogged: boolean = false;
  constructor(private authService: UserAuthService) {}

  ngOnInit() {
    this.isUserlogged = this.authService.isUserLogged;
  }
  login() {
    this.authService.login('userName', 'Password');
    this.isUserlogged = this.authService.isUserLogged;
  }
  logout() {
    this.authService.logout();
    this.isUserlogged = this.authService.isUserLogged;
  }
}
