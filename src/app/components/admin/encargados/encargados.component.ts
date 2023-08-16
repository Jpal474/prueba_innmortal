import { Component, OnInit } from '@angular/core';
import { Encargado } from '../interfaces/encargados.interface';
import { AdminService } from 'src/app/services/admin-encargado.service';


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
    .subscribe((res:Encargado[])=>{
      this.encargados=res
      console.log(res)
    },
     
    )
  }
  
  actualizarItems(items:string){
    this.items=parseInt(items)
    console.log(items);
  }


}
