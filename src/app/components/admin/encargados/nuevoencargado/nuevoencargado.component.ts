import { Component } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Encargado, EncargadoGenero } from '../../interfaces/encargados.interface';
import { AdminService } from 'src/app/services/admin-encargado.service';
import Swal from 'sweetalert2';
import { MustMatch } from './match-password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevoencargado',
  templateUrl: './nuevoencargado.component.html',
  styleUrls: ['./nuevoencargado.component.css']
})
export class NuevoencargadoComponent {
  encargado_formulario!: FormGroup
  fieldTextType: boolean=false;
  fieldTextType2: boolean=false;
  encargado:Encargado={
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    fecha_nacimiento:'',
    genero:EncargadoGenero.MASCULINO,
    correo:'',
    telefono:'',
    contraseña:'',
    tipo:'encargado'

  }

  constructor(private fb:FormBuilder,
    private adminEncargadoService:AdminService,
    private router:Router){
    this.crearFormulario()
  }
  crearFormulario(){
  this.encargado_formulario=this.fb.group({
    nombre:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
    apellido_paterno:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
    apellido_materno:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
    fecha_nacimiento:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
    genero:['', Validators.required],
    correo:['', Validators.required],
    telefono:['', [Validators.required, Validators.pattern(/^\(\d{3}\)-\d{3}-\d{4}$/)]],
    contraseña:['', Validators.required],
    confirmar_contraseña:['', Validators.required]},
    )

  }

  guardarEncargado(){
    console.log(this.encargado_formulario.value)
    if(!this.encargado_formulario.invalid){
      const {confirmar_contraseña: _, ...nuevoEncargado}=this.encargado_formulario.value
      this.encargado=nuevoEncargado
      this.encargado.tipo='encargado'
      console.log(this.encargado)
      this.adminEncargadoService.createEncargado(this.encargado)
      .subscribe(
        res=>{
          Swal.fire({
            icon: 'success',
            title: 'Registro Terminado',
            text: 'El nuevo Encargado Ha Sido Registrado!',
          })
          this.router.navigate([`/admin/inicio`]);
        },
        err=>console.log(err)
      )
    }
    else{
      return Object.values( this.encargado_formulario.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
        
      });
    }

  

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  
  get nombreNoValido(){
    let mensaje:String='';
    if( this.encargado_formulario.get('nombre')?.errors?.['required'] && this.encargado_formulario.get('nombre')?.touched){
      mensaje= "El campo no puede estar vacío";
    }
    else if(this.encargado_formulario.get('nombre')?.errors?.['pattern']){
      mensaje= "El nombre no puede contener números o carácteres especiales";
    }
    return mensaje
  }
  get apellidopaternoNoValido(){
    let mensaje:String='';
    if( this.encargado_formulario.get('apellido_paterno')?.errors?.['required'] && this.encargado_formulario.get('apellido_paterno')?.touched){
      mensaje= "El campo no puede estar vacío";
    }
    else if(this.encargado_formulario.get('apellido_paterno')?.errors?.['pattern']){
      mensaje= "El apellido paterno no puede contener números o carácteres especiales";
    }
    return mensaje
    }
  get apellidomaternoNoValido(){
    let mensaje:String='';
    if( this.encargado_formulario.get('apellido_materno')?.errors?.['required'] && this.encargado_formulario.get('apellido_materno')?.touched){
      mensaje= "El campo no puede estar vacío";
    }
    else if(this.encargado_formulario.get('apellido_materno')?.errors?.['pattern']){
      mensaje= "El apellido materno no puede contener números o carácteres especiales";
    }
    return mensaje
  }
  get fechaNoValido(){
    return this.encargado_formulario.get('fecha_nacimiento')?.invalid && this.encargado_formulario.get('fecha_nacimiento')?.touched
  }
  get generoNoValido(){
    return this.encargado_formulario.get('fecha_nacimiento')?.invalid && this.encargado_formulario.get('fecha_nacimiento')?.touched
  }
  get correoNoValido(){
    return this.encargado_formulario.get('fecha_nacimiento')?.invalid && this.encargado_formulario.get('fecha_nacimiento')?.touched
  }
  get telefonoNoValido(){
    let mensaje:String='';
    if( this.encargado_formulario.get('telefono')?.errors?.['required'] && this.encargado_formulario.get('telefono')?.touched){
      mensaje= "El campo no puede estar vacío";
    }
    else if(this.encargado_formulario.get('telefono')?.errors?.['pattern']){
      mensaje="El número debe ser ingresado en el formato (XXX)-XXX-XXXX"
    }
    return mensaje
  }
  get contraseniaNoValido(){
    return this.encargado_formulario.get('contraseña')?.invalid && this.encargado_formulario.get('contraseña')?.touched
  }
  get confirmarContraseniaNoValida(){

    const pass1 = this.encargado_formulario.get('contraseña')?.value;
    const pass2 = this.encargado_formulario.get('confirmar_contraseña')?.value;

    return ( pass1 === pass2 
    ) ? false : true;  }
}
