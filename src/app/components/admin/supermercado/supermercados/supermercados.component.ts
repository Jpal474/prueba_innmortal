import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-encargado.service';
import { Supermercado } from '../../interfaces/supermercado.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.component.html',
  styleUrls: ['./supermercados.component.css']
})
export class SupermercadosComponent implements OnInit {
  p: number = 1;
  items:number=5;
  supermercados:Supermercado[]=[]
  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.getSupermercados()
        
      }
      getSupermercados(){ 
        this.adminService.getSupermercados()
        .subscribe({
          next: (res:Supermercado[])=>{
          this.supermercados=res
          console.log(res)
        },
        error: (e) => {
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
