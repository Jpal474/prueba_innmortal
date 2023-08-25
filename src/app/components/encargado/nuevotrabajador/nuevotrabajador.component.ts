import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncargadoService } from 'src/app/services/encargado.service';
import { Trabajador } from '../../admin/interfaces/trabajador.interface';
import Swal from 'sweetalert2';
import { Departamento } from '../../admin/interfaces/departamento.interface';
import { TrabajadorDepartamento } from '../../admin/interfaces/trabajador-departamento.interface';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-encargado.service';
import { Encargado } from 'src/app/interfaces/encargados.interface';


@Component({
  selector: 'app-nuevotrabajador',
  templateUrl: './nuevotrabajador.component.html',
  styleUrls: ['./nuevotrabajador.component.css']
})
export class NuevotrabajadorComponent {
  trabajador_formulario!: FormGroup
  trabajador_departamento_formulario!:FormGroup 
  departamentos:Departamento[]=[]
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
    this.crearFormulario();
    this.getDepartamentos();
  }
  crearFormulario(){
  this.trabajador_formulario=this.fb.group({
    id:['', [Validators.required, Validators.pattern(/^FV-\d+$/), this.notOnlyWhitespace]],
    nombre:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$'), this.notOnlyWhitespace]],
    apellidos:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$'), this.notOnlyWhitespace]],
    dias_laborales:['', Validators.required],
    telefono:['', [Validators.required, this.notOnlyWhitespace]],
  
  })
this.trabajador_departamento_formulario=this.fb.group({
  departamento:['',Validators.required]
})
  
  }

getDepartamentos(){
  this.encargadoService.getDepartamentosBySuperId(localStorage.getItem('id_supermercado')!)
  .subscribe({
    next: (res:Departamento[]) => {
      this.departamentos=res
      console.log(`Departamentos ${this.departamentos}`)
    },
    error: (e) => {
      Swal.fire({
        icon: 'error',
        text: e,
      })
    }
  })
}


  guardarTrabajador(){
    if(!this.trabajador_formulario.invalid){
    this.trabajador_departamento=this.trabajador_formulario.value;
    console.log(`Valores ${this.trabajador_departamento_formulario}`)
    console.log()
    if(this.departamentos !== null){
      console.log(`Nombre del Departamento ${this.trabajador_departamento_formulario.value.departamento.toLowerCase()}`)
      this.encargadoService.getDepartamentoByNombre(this.trabajador_departamento_formulario.value.departamento.toLowerCase(), localStorage.getItem('id_supermercado')!)
        .subscribe({
          next: (res:Departamento) => {
          console.log(`departamento ${res}`)
          this.trabajador_departamento.departamento=res
          this.encargadoService.createTrabajador(this.trabajador_departamento)
              .subscribe({
                next: (res:Trabajador) => {
              Swal.fire({
              icon: 'success',
              title: 'Registro Terminado',
              text: 'El nuevo Trabajador Ha Sido Registrado!',
                })
                this.router.navigate([`/encargado/trabajadores`])
              }
              ,
              error: (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: err,
                })
              }
            })
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
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No Es Posible Dar de Alta Un Trabajador Sin Un Departamento!',
    })
  }
    
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

  notOnlyWhitespace(control: AbstractControl) {
    if (control.value !== null && control.value.trim() === '') {
      return { notOnlyWhitespace: true };
    }
    return null;
  }
  
  get fechaNacimientoControl() {
    return this.trabajador_formulario.get('fecha_nacimiento');
  }
  

  get departamentoNoValido(){
    return this.trabajador_formulario.get('departamento')?.invalid && this.trabajador_formulario.get('departamento')?.touched
  }

get idNoValido(){
  let mensaje:String='';
  if( this.trabajador_formulario.get('id')?.errors?.['required'] && this.trabajador_formulario.get('id')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.trabajador_formulario.get('id')?.errors?.['pattern']){
    mensaje= "El ID deber ser de la forma FV-XXX";
  }
  else if(this.trabajador_formulario.get('id')?.errors?.['notOnlyWhitespace'] && this.trabajador_formulario.get('id')?.touched) {
    mensaje= "El campo no puede consistir solo en espacios en blanco.";
  }
  return mensaje
}

get nombreNoValido(): String{
  let mensaje:String='';
  if( this.trabajador_formulario.get('nombre')?.errors?.['required'] && this.trabajador_formulario.get('nombre')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.trabajador_formulario.get('nombre')?.errors?.['pattern']){
    mensaje= "El nombre no puede contener números o carácteres especiales";
  }
  else if(this.trabajador_formulario.get('nombre')?.errors?.['notOnlyWhitespace'] && this.trabajador_formulario.get('nombre')?.touched) {
    mensaje= "El campo no puede consistir solo en espacios en blanco.";
  }
  return mensaje
}

get apellidosNoValido(): String{
  let mensaje:String='';
  if( this.trabajador_formulario.get('apellidos')?.errors?.['required'] && this.trabajador_formulario.get('apellidos')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.trabajador_formulario.get('apellidos')?.errors?.['pattern']){
    mensaje= "El/Los apellidos no pueden contener números o carácteres especiales";
  }
  else if(this.trabajador_formulario.get('apellidos')?.errors?.['notOnlyWhitespace'] && this.trabajador_formulario.get('apellidos')?.touched) {
    mensaje= "El campo no puede consistir solo en espacios en blanco.";
  }
  return mensaje
}

get diasNoValidos(){
  return this.trabajador_formulario.get('dias_laborales')?.invalid && this.trabajador_formulario.get('dias_laborales')?.touched
}

get telefonoNoValido(){
  let mensaje:String='';
  if( this.trabajador_formulario.get('telefono')?.errors?.['required'] && this.trabajador_formulario.get('telefono')?.touched){
      mensaje="El campo no puede estar vacío"
  }
  else if(this.trabajador_formulario.get('telefono')?.errors?.['notOnlyWhitespace'] && this.trabajador_formulario.get('telefono')?.touched) {
    mensaje= "El campo no puede consistir solo en espacios en blanco.";
  }
  return mensaje;
}

    
}
