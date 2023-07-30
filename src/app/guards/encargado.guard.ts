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
    if(localStorage.getItem('tipo') === 'encargado'){
      return true;
    }
    else{
    this.router.navigate(['/admin/inicio'])
    return false;
  }
}
}



export const encargadoGuard: CanActivateFn = (route:  ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsToken).canActivate();
};