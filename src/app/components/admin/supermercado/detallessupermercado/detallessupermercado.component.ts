import { Component, OnInit } from '@angular/core';
import { Supermercado } from '../../interfaces/supermercado.interface';
import { AdminService } from 'src/app/services/admin-encargado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detallessupermercado',
  templateUrl: './detallessupermercado.component.html',
  styleUrls: ['./detallessupermercado.component.css']
})
export class DetallessupermercadoComponent implements OnInit{
supermercado:Supermercado={
  nombre: '',
  calle: '',
  numero: 0,
  colonia: '',
  estado: '',
  ciudad: '',
  razon_social: '',
  correo: '',
  codigo_postal: 0,
  telefono: '',

}  

  constructor(private adminService: AdminService,
    private activadedRoute:ActivatedRoute
    ){}

  ngOnInit(): void {
    const params = this.activadedRoute.snapshot.params;
    if(params){
      this.adminService.getSupermercado(params['id'])
      .subscribe((res:Supermercado)=>{
        console.log(res)
        this.supermercado=res;
      })
    }

}//cierre de oninit

}//cierre de clase
