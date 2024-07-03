// import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserAuthService } from '../Services/user-auth.service';

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuard implements CanActivate{
//   constructor(private router:Router){

//   }
//   canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Boolean{
//   return false
//   }
// }

export const AuthGuard: CanActivateFn = (route, state) => {
  if (inject(UserAuthService).isUserLogged) {
    return true;
  } else {
    alert('You need to login');
    inject(Router).navigate(['/Login']);
    return false;
  }
};
