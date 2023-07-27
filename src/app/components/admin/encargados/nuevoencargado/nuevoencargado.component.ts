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

  }

  constructor(private fb:FormBuilder,
    private adminEncargadoService:AdminService,
    private router:Router){
    this.crearFormulario()
  }
  crearFormulario(){
  this.encargado_formulario=this.fb.group({
    nombre:['', Validators.required],
    apellido_paterno:['', Validators.required],
    apellido_materno:['', Validators.required],
    fecha_nacimiento:['', Validators.required],
    genero:['', Validators.required],
    correo:['', Validators.required],
    telefono:['', Validators.required],
    contraseña:['', Validators.required],
    confirmar_contraseña:['', Validators.required]},
    )

  }

  guardarEncargado(){
    console.log(this.encargado_formulario.value)
    if(!this.encargado_formulario.invalid){
      console.log('entra')
      const {confirmar_contraseña: _, ...nuevoEncargado}=this.encargado_formulario.value
      this.encargado=nuevoEncargado
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
  get f() { return this.encargado_formulario.controls; }
  get nombreNoValido(){
    return this.encargado_formulario.get('nombre')?.invalid && this.encargado_formulario.get('nombre')?.touched
  }
  get apellidopaternoNoValido(){
    return this.encargado_formulario.get('apellido_paterno')?.invalid && this.encargado_formulario.get('apellido_paterno')?.touched
  }
  get apellidomaternoNoValido(){
    return this.encargado_formulario.get('apellido_materno')?.invalid && this.encargado_formulario.get('apellido_materno')?.touched
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
    return this.encargado_formulario.get('telefono')?.invalid && this.encargado_formulario.get('telefono')?.touched
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
