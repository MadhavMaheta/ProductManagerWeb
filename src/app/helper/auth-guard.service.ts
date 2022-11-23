import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {

  constructor(public jwtHelper: JwtHelperService, public router: Router) { }

  canActivate(): boolean {
    debugger;
    if (!this.isTokenAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  isTokenAuthenticated() : boolean{
    const token = localStorage.getItem('currentUserToken')?.toString();
    if(this.jwtHelper.isTokenExpired(token))
    {
      localStorage.removeItem('currentUserToken');
      return false;
    }
    else{
      return true;
    }
  }
}
