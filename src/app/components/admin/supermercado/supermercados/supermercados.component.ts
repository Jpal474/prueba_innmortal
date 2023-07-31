import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-encargado.service';
import { Supermercado } from '../../interfaces/supermercado.interface';

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.component.html',
  styleUrls: ['./supermercados.component.css']
})
export class SupermercadosComponent implements OnInit {
  p: number = 1;
  supermercados:Supermercado[]=[]
  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.getSupermercados()
        
      }
      getSupermercados(){ 
        this.adminService.getSupermercados()
        .subscribe((res:Supermercado[])=>{
          this.supermercados=res
          console.log(res)
        },
         
        )
      }

}
