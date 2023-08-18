import { Component, OnInit } from '@angular/core';
import { Encargado } from '../interfaces/encargados.interface';
import { AdminService } from 'src/app/services/admin-encargado.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrls: ['./encargados.component.css']
})
export class EncargadosComponent implements OnInit  {
  p: number = 1;
  items:number=5;
  verificado:boolean=false;
  encargados:Encargado[]=[];
  sideNavStatus:boolean=false;
  constructor(private adminService:AdminService){ 
    if(localStorage.getItem('verificado') !== null){
      if(localStorage.getItem('verificado') === 'true'){
        this.verificado=true;
      }
    }
  }

  ngOnInit(): void {
this.getEncargados()
    
  }
  getEncargados(){ 
    this.adminService.getEncargados()
    .subscribe({
      next: (res:Encargado[])=>{
      this.encargados=res
      console.log(res)
    },
    error(e){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e,
      })
    }
     
  })
  }
  
  actualizarItems(items:string){
    this.items=parseInt(items)
    console.log(items);
  }


}
