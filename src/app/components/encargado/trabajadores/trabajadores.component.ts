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
                            this.trabajadores[index]=res[index]
                      })//cierre del subcribe del trabajador
                      
                    }
        })//cierre del subscribe del departamento
      
        
      }
      eliminarTrabajador(id: string): void {
        this.encargadoService.deleteTrabajador(id)
          .subscribe(
            res => {
              console.log(res);
              this.getTrabajadores();
            },
            err => console.log(err)
          )
      }
}
