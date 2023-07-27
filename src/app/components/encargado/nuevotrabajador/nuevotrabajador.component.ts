import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncargadoService } from 'src/app/services/encargado.service';
import { Trabajador } from '../../admin/interfaces/trabajador.interface';
import Swal from 'sweetalert2';
import { Departamento } from '../../admin/interfaces/departamento.interface';
import { TrabajadorDepartamento } from '../../admin/interfaces/trabajador-departamento.interface';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-encargado.service';


@Component({
  selector: 'app-nuevotrabajador',
  templateUrl: './nuevotrabajador.component.html',
  styleUrls: ['./nuevotrabajador.component.css']
})
export class NuevotrabajadorComponent {
  trabajador_formulario!: FormGroup
  trabajador_departamento_formulario!:FormGroup 
  trabajador_departamento:TrabajadorDepartamento={
      id:'',
      nombre:'',
      apellidos:'',
      dias_laborales:'',
      telefono:'',
    departamento:{
      id:'',
      nombre:''
    },
  }
  constructor(private fb:FormBuilder,
    private encargadoService:EncargadoService,
    private adminService:AdminService,
    private router:Router,
    ){
    this.crearFormulario()
  }
  crearFormulario(){
  this.trabajador_formulario=this.fb.group({
    id:['', Validators.required],
    nombre:['', Validators.required],
    apellidos:['', Validators.required],
    dias_laborales:['', Validators.required],
    telefono:['', Validators.required],
  
  })
this.trabajador_departamento_formulario=this.fb.group({
  departamento:['',Validators.required]
})
  
  }
  guardarTrabajador(){
    if(!this.trabajador_formulario.invalid){
    this.trabajador_departamento=this.trabajador_formulario.value;
    console.log(this.trabajador_departamento_formulario.value.departamento)
      this.encargadoService.getDepartamentoByNombre(this.trabajador_departamento_formulario.value.departamento.toLowerCase())
        .subscribe((res:Departamento) => {
          console.log(`departamento ${res}`)
          this.trabajador_departamento.departamento=res
          this.encargadoService.createTrabajador(this.trabajador_departamento)
              .subscribe((res:Trabajador) => {
              Swal.fire({
              icon: 'success',
              title: 'Registro Terminado',
              text: 'El nuevo Trabajador Ha Sido Registrado!',
                })
              },
              err=>console.log(err)
        )
    })
    
    this.router.navigate([`/encargado/trabajadores`])

    
  }else{
    return Object.values( this.trabajador_formulario.controls ).forEach( control => {
        
      if ( control instanceof FormGroup ) {
        Object.values( control.controls ).forEach( control => control.markAsTouched() );
      } else {
        control.markAsTouched();
      }
      
      
    });
  }
  

  }

  get departamentoNoValido(){
    return this.trabajador_formulario.get('departamento')?.invalid && this.trabajador_formulario.get('departamento')?.touched
  }

get idNoValido(){
  return this.trabajador_formulario.get('id')?.invalid && this.trabajador_formulario.get('id')?.touched
}

get nombreNoValido(){
  return this.trabajador_formulario.get('nombre')?.invalid && this.trabajador_formulario.get('nombre')?.touched
}

get apellidosNoValido(){
  return this.trabajador_formulario.get('apellidos')?.invalid && this.trabajador_formulario.get('apellidos')?.touched
}

get diasNoValidos(){
  return this.trabajador_formulario.get('dias_laborales')?.invalid && this.trabajador_formulario.get('dias_laborales')?.touched
}

get telefonoNoValido(){
  return this.trabajador_formulario.get('telefono')?.invalid && this.trabajador_formulario.get('telefono')?.touched
}

    
}
