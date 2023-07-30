import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn:'root'
})
class PermissionsToken {
  constructor(
    private router:Router 
    ){

  }
  canActivate(): boolean {
    if(localStorage.getItem('tipo') === 'admin'){
      return true;
    }
    else{
    this.router.navigate(['/encargado/departamentos'])
    return false;
  }
}
}



export const adminGuard: CanActivateFn = (route:  ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsToken).canActivate();
};
