import { Component, OnInit } from '@angular/core';
import { EncargadoService } from 'src/app/services/encargado.service';
import { Trabajador } from '../../admin/interfaces/trabajador.interface';
import Swal from 'sweetalert2';
import { Departamento } from '../../admin/interfaces/departamento.interface';


@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit{
p:number=1;
items:number=5;
trabajadores:Trabajador[]=[]
departamentos:Departamento[]=[]
  constructor(private encargadoService:EncargadoService){

  }

  ngOnInit(): void {
    this.getTrabajadores()
        
      }

      getTrabajadores(){
        if(localStorage.getItem('id_supermercado') !== null){
        this.encargadoService.getDepartamentosBySuperId(localStorage.getItem('id_supermercado')!)
        .subscribe({
          next: (res:Departamento[]) => {
                    this.departamentos=res
                    if(res.length!==0){
                    for (let index = 0; index < this.departamentos.length; index++) {
                      this.encargadoService.getTrabajadores(this.departamentos[index].id!)
                      .subscribe({
                        next: (res:Trabajador[]) => {
                            for (let j=0; j<res.length;j++){
                              this.trabajadores.push(res[j])
                            }
                            
                            console.log(this.trabajadores);
                      },
                      error: (e) => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: e,
                        })
                      }
                    })//cierre del subcribe del trabajador
                      
                    }}
                    else{
                      Swal.fire({
                        icon: 'warning',
                        text: 'No hay trabajadores por mostrar!',
                      })
                    }
        },
      error: (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e,
        })
      } 
      })//cierre del subscribe del departamento
        }
        else{
          Swal.fire({
            icon: 'warning',
            text: 'No hay trabajadores por mostrar!',
          })
        }
        
      }
      eliminarTrabajador(id: string): void {
        Swal.fire({
          title: '¿Estás seguro?',
          text: "No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Borrar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.encargadoService.deleteTrabajador(id)
            .subscribe({
              next: (res:boolean) => {
                if(res){
                Swal.fire({
                  icon: 'success',
                  title: 'Trabajador Eliminado',
                  text: 'El nuevo Trabajador Ha Sido Eliminado!',
                })
                setTimeout(function(){
                  window.location.reload();
               }, 2000);
              }//cierre del if
            }
              ,
              error: (e) => {
                Swal.fire({
                  icon: 'error',
                  text: e,
                })
              }
          })
          }
        })
      }

      actualizarItems(items:string){
        this.items=parseInt(items)
        console.log(items);
      }
}
