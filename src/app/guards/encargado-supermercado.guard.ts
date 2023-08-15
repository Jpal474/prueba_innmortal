import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AdminService } from '../services/admin-encargado.service';
import { Encargado, EncargadoGenero } from '../interfaces/encargados.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

class Permissions {
  encargado = {} as Encargado
  constructor(
    private adminService:AdminService,
    private router:Router 
    ){

  }
  canActivate(): boolean {
    let band=true
   this.adminService.getEncargadoById(localStorage.getItem('id_usuario')!)
   .subscribe({
    next: (res:Encargado) => {
          this.encargado =res;
          console.log(this.encargado.supermercado)
          if(this.encargado.supermercado){
            this.router.navigate(['encargado/departamentos'])
           }
           else{
            band = true;
           }
    },
    error: (e) => {
      Swal.fire({
        icon: 'error',
        text: e,
      })
    }
   })
   return band;

  }
}

export const encargadoSupermercadoGuard: CanActivateFn = (route:  ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  return inject(Permissions).canActivate();
};


