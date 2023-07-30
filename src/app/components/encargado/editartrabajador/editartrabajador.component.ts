import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncargadoService } from 'src/app/services/encargado.service';
import { Trabajador } from '../../admin/interfaces/trabajador.interface';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajadorDepartamento } from 'src/app/interfaces/trabajador-departamento.interface';
import { Departamento } from 'src/app/interfaces/departamento.interface';

@Component({
  selector: 'app-editartrabajador',
  templateUrl: './editartrabajador.component.html',
  styleUrls: ['./editartrabajador.component.css']
})
export class EditartrabajadorComponent implements OnInit{

  trabajador_formulario!: FormGroup
  trabajador:TrabajadorDepartamento={
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
  constructor(
    private fb:FormBuilder,
    private encargadoService:EncargadoService,
    private activadedRoute:ActivatedRoute,
    private router:Router,

    ){
    this.crearFormulario()
  }
ngOnInit(): void {
  const params = this.activadedRoute.snapshot.params;
  if(params){
    this.encargadoService.getTrabajador(params['id'])
    .subscribe((res:Trabajador)=>{
      // console.log(res)
      this.trabajador_formulario.patchValue({
        id:res.id,
    nombre:res.nombre,
    apellidos:res.apellidos,
    dias_laborales:res.dias_laborales,
    telefono:res.telefono,
    departamento:res.departamento?.nombre
      })
    })
  }
}

  crearFormulario(){
  this.trabajador_formulario=this.fb.group({
    id:['', Validators.required],
    nombre:['', Validators.required],
    apellidos:['', Validators.required],
    dias_laborales:['', Validators.required],
    telefono:['', Validators.required,],
    departamento:['', Validators.required],
  
  
  })
  }
  actualizarTrabajador(){
    if(!this.trabajador_formulario.invalid){
    const params = this.activadedRoute.snapshot.params;
    this.trabajador=this.trabajador_formulario.value;
    console.log(this.trabajador)
    this.encargadoService.getDepartamentoByNombre(this.trabajador_formulario.value.departamento)
    .subscribe((res:Departamento) => {
      this.trabajador.departamento=res
      this.encargadoService.updateTrabajador(params['id'],this.trabajador)
      .subscribe({
        next: (v) => {
          Swal.fire({
            icon: 'success',
            title: 'Edición Terminada',
            text: 'El nuevo Trabajador Ha Sido Editado Con Éxito!',
          })
        },
        error: (e) => console.error(e),
    })
      
    })
    this.router.navigate(['/encargado/trabajadores'])
  }
  else{
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
