import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../Services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;
  // isUserLogged: boolean;
  constructor(private authService: UserAuthService) {
    // this.isUserLogged = this.authService.isUserLogged;
  }
  ngOnInit(): void {
    // this.isUserLogged = this.authService.isUserLogged;
    this.authService.getLoggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
}
