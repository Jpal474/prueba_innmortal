import { Component } from '@angular/core';
import { EncargadoService } from 'src/app/services/encargado.service';
import { Trabajador } from '../../admin/interfaces/trabajador.interface';
import Swal from 'sweetalert2';
import { Departamento } from '../../admin/interfaces/departamento.interface';


@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent {
p:number=1;
trabajadores:Trabajador[]=[]
departamentos:Departamento[]=[]
  constructor(private encargadoService:EncargadoService){

  }

  ngOnInit(): void {
    this.getTrabajadores()
        
      }

      getTrabajadores(){
        this.encargadoService.getDepartamentosBySuperId(localStorage.getItem('id_supermercado')!)
        .subscribe((res:Departamento[]) => {
                    this.departamentos=res
                    for (let index = 0; index < this.departamentos.length; index++) {
                      this.encargadoService.getTrabajadores(this.departamentos[index].id!)
                      .subscribe((res:Trabajador[]) => {
                            for (let j=0; j<res.length;j++){
                              this.trabajadores.push(res[j])
                            }
                            
                            console.log(this.trabajadores);
                      })//cierre del subcribe del trabajador
                      
                    }
        })//cierre del subscribe del departamento
      
        
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
              next: (v) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Trabajador Eliminado',
                  text: 'El nuevo Trabajador Ha Sido Eliminado!',
                })
                setTimeout(function(){
                  window.location.reload();
               }, 2000);
              },
              error: (e) => console.error(e),
          })
          }
        })
      }
}
