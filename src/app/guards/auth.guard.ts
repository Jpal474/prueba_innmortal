import { CanActivateFn } from '@angular/router';

import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn:'root'
})
class PermissionsToken {
  constructor(
    private router:Router 
    ){

  }
  canActivate(): boolean {
    if(localStorage.getItem('token')){
      return true;
    }
    else{
    this.router.navigate(['/login'])
    return false;
  }
}
}


export const authGuard: CanActivateFn = (route:  ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsToken).canActivate();
};
