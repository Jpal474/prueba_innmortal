import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-encargado.service';
import { EncargadoService } from 'src/app/services/encargado.service';
import Swal from 'sweetalert2';
import { Departamento } from '../../admin/interfaces/departamento.interface';
import { Supermercado } from '../../admin/interfaces/supermercado.interface';
import { DepartamentoSupermercado } from '../../admin/interfaces/departamento-supermercado.interface';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit{
  p: number = 1;
  departamento_supermercado:DepartamentoSupermercado={
    nombre:'',
    supermercado:{id:'',
    nombre:'',
    calle:'',
    numero:0,
    colonia:'',
    estado:'',
    razon_social:'',
    ciudad:'',
    correo:'',
    codigo_postal:0,
    telefono:'',}
  }
 departamentos!:Departamento[]
constructor(
  private encargadoService:EncargadoService,
  private adminService:AdminService){}

  ngOnInit(): void {
    this.getDepartamentos()
  }

  getDepartamentos(){
   this.encargadoService.getDepartamentosBySuperId(localStorage.getItem('id_supermercado')!)
   .subscribe((res:Departamento[]) => {
    this.departamentos=res
    console.log(res)
   })
  }

  async guardarDepartamento(){
    const { value: departamento } = await Swal.fire({
      title: 'Ingrese Departamento',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Ingrese Nombre del Departamento'
    })
    
    if (departamento && localStorage.getItem('id_supermercado')!==null) {
      console.log(`Departamento Registrado: ${departamento}`)
      this.adminService.getSupermercado(localStorage.getItem('id_supermercado')!)
      .subscribe((res:Supermercado) => {
        console.log(`Respuesta Res ${res.id}`)
        this.departamento_supermercado.supermercado=res;
        this.departamento_supermercado.nombre=departamento.toLowerCase();
      console.log(`Departamento: ${this.departamento_supermercado.nombre}`)
      console.log(`Supermercado: ${this.departamento_supermercado.supermercado}`)
      this.encargadoService.createDepartamento(this.departamento_supermercado)
              .subscribe((res:Departamento)=>{
                Swal.fire(`Departamento Registrado: ${departamento}`)
                window.location.reload()
              })
              
    
    
      });
      
    }
    if(departamento && localStorage.getItem('id_supermercado') === null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No es posible dar de alta un departamento hasta registrar un supermercado',
      })
    }
  
  }
  eliminarDepartamento(departamentoid:string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.encargadoService.deleteDepartamento(departamentoid)
        .subscribe((res:Departamento) => {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}