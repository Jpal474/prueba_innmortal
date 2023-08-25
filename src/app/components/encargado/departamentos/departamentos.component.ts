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
  items:number=5;
  verificado: boolean = false;
  departamento_supermercado:DepartamentoSupermercado={
    nombre:'',
    supermercado:{id:'',
    nombre:'',
    calle:'',
    numero:'',
    colonia:'',
    estado:'',
    razon_social:'',
    ciudad:'',
    correo:'',
    codigo_postal:0,
    telefono:'',}
  }
 departamentos:Departamento[]=[]
constructor(
  private encargadoService:EncargadoService,
  private adminService:AdminService
  ){
    if(localStorage.getItem('verificado') !== null){
      if(localStorage.getItem('verificado') === 'true'){
        this.verificado=true;
      }
    }
  }

  ngOnInit(): void {
    this.getDepartamentos()
  }

  getDepartamentos(){
    if(localStorage.getItem('id_supermercado') !== null){
      console.log('entra al if')
     this.encargadoService.getDepartamentosBySuperId(localStorage.getItem('id_supermercado')!)
   .subscribe({
    next: (res:Departamento[]) => {
    if(res.length===0){
      Swal.fire({
        icon: 'warning',
        text: 'No hay departamentos por mostrar!',
      })
    }
    else{
      this.departamentos=res;
    }
   },
  error: (e) => {
    Swal.fire({
      icon: 'error',
      text: e,
    })
  }
  })
  }
  else{
    Swal.fire({
      icon: 'warning',
      text: 'No hay departamentos por mostrar!',
    })
  }
  }


  async guardarDepartamento(){
    const { value: departamento } = await Swal.fire({
      title: 'Ingrese Departamento',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Ingrese Nombre del Departamento'
    })
    console.log('antes de if para departamento y localstorage');
    
    if (departamento && localStorage.getItem('id_supermercado')!==null) {
      console.log('entra al if para departamento');
      
      let result=true
      console.log('this.departamentos',this.departamentos);
      
      if(this.departamentos.length !==0 ){
        console.log('antes de for');
      for (let i = 0; i < this.departamentos.length; i++) {
        console.log('entra al for');
        
        if(departamento.toLowerCase() === this.departamentos[i].nombre){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No puedes registrar dos Departamentos con el mismo nombre',
          })
          result=false;
          break;
        } 
        }
        if(result){
          console.log('entra al if para result');
      console.log(`Departamento Registrado: ${departamento}`)
      this.adminService.getSupermercado(localStorage.getItem('id_supermercado')!)
      .subscribe({
        next:(res:Supermercado) => {
        console.log(`Respuesta Res ${res.id}`)
        this.departamento_supermercado.supermercado=res;
        this.departamento_supermercado.nombre=departamento.toLowerCase();
      console.log(`Departamento: ${this.departamento_supermercado.nombre}`)
      console.log(`Supermercado: ${this.departamento_supermercado.supermercado}`)
      this.encargadoService.createDepartamento(this.departamento_supermercado)
              .subscribe({
                next: (res:Departamento)=>{
                Swal.fire(`Departamento Registrado: ${departamento}`)
                setTimeout(function(){
                  window.location.reload();
               }, 2000);
              },
            error: (e) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: e,
              })
            }
            })
              
    
    
      },
    error: (e) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e
      })
    }
    });
  }//cierre del if para result
  }
  else{
    console.log('else para this.departamentos');
    console.log(`Departamento Registrado: ${departamento}`)
      this.adminService.getSupermercado(localStorage.getItem('id_supermercado')!)
      .subscribe({
        next:(res:Supermercado) => {
        console.log(`Respuesta Res ${res.id}`)
        this.departamento_supermercado.supermercado=res;
        this.departamento_supermercado.nombre=departamento.toLowerCase();
      console.log(`Departamento: ${this.departamento_supermercado.nombre}`)
      console.log(`Supermercado: ${this.departamento_supermercado.supermercado}`)
      this.encargadoService.createDepartamento(this.departamento_supermercado)
              .subscribe({
                next: (res:Departamento)=>{
                Swal.fire(`Departamento Registrado: ${departamento}`)
                setTimeout(function(){
                  window.location.reload();
               }, 2000);
              },
            error: (e) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: e,
              })
            }
            })
              
    
    
      },
    error: (e) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e,
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    });
  } //ciere del if para this.departamentos.length!==0
    }//cierre del if general
    if(departamento && localStorage.getItem('id_supermercado') === null){
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No es posible dar de alta un departamento hasta registrar un supermercado',
      })
    }
  
  }
  eliminarDepartamento(departamentoid : string | undefined){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás Seguro?',
      text: "No serás capaz de revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.encargadoService.deleteDepartamento(departamentoid)
        .subscribe({
          next: (res:boolean) => {
            if(res){
          swalWithBootstrapButtons.fire(
            'Borrado!',
            'El Departamento Ha Sido Eliminado',
            'success'
          )
          setTimeout(function(){
            window.location.reload();
         }, 2000);
        }//cierre del if
        },
        error: (e) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: e,
          })
        }
      })
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El Departamento No Ha Sido Borrado!',
          'error'
        )
      }
    })
  }

  actualizarItems(items:string){
    this.items=parseInt(items)
    console.log(items);
  }

}