import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-encargado.service';
import { EncargadoGenero, Encargado } from '../../interfaces/encargados.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UpdateEncargado } from '../../interfaces/update-encargado.interface';
@Component({
  selector: 'app-editarencargado',
  templateUrl: './editarencargado.component.html',
  styleUrls: ['./editarencargado.component.css']
})
export class EditarencargadoComponent implements OnInit{
  encargado_formulario!: FormGroup
  fieldTextType:boolean=false;
  fieldTextType2:boolean=false;
  encargado: Encargado={
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    fecha_nacimiento: '',
    genero:EncargadoGenero.MASCULINO,
    correo:'',
    telefono:'',
    contraseña:'',
  }

  constructor( private adminEncargadoService : AdminService,
    private fb: FormBuilder,
    private router:Router,
    private activadedRoute:ActivatedRoute) {
      this.crearFormulario()
  }
ngOnInit(): void {
  const params = this.activadedRoute.snapshot.params;
  if(params){
    this.adminEncargadoService.getEncargadoById(params['id'])
    .subscribe({
      next:(res:Encargado)=>{
      console.log('Encargado')
      console.log(res)
      this.encargado_formulario.patchValue({
        nombre:res.nombre,
        apellido_paterno:res.apellido_paterno,
        apellido_materno:res.apellido_materno,
        fecha_nacimiento:res.fecha_nacimiento,
        genero:res.genero,
        correo:res.correo,
        telefono:res.telefono,

      })

      console.log(res.nombre)
    },
  error: (e) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: e,
    })
  } //ciere del subscribe
  })
  }
}

crearFormulario(){
  this.encargado_formulario=this.fb.group({
    nombre:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$'), this.notOnlyWhitespace]],
    apellido_paterno:['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-0-9]*$/), this.notOnlyWhitespace]],
    apellido_materno:['', [Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-0-9]*$/)]],
    fecha_nacimiento:['', [Validators.required,  this.minDateValidator, this.maxDateValidator]],
    genero:['', Validators.required],
    correo:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    telefono:['', [Validators.required, Validators.pattern(/^\(\d{3}\)-\d{3}-\d{4}$/)]],
    contraseña:[''],
    confirmar_contraseña:[''],
  
  })
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  updateEncargado(){
    const params = this.activadedRoute.snapshot.params;
    const {confirmar_contraseña: _, ...nuevoEncargado}=this.encargado_formulario.value
    if(!this.encargado_formulario.invalid){
    if(this.encargado_formulario.value.contraseña.length === ''){
      this.encargado_formulario.value.contraseña=this.encargado.contraseña;
    }
    this.encargado_formulario.value.correo=this.encargado_formulario.value.correo.toLowerCase()
    this.encargado=this.encargado_formulario.value
    console.log(this.encargado)
    Swal.fire({
      title: '¿Estás Seguro?',
      text: "Los cambios se aplicarán al encargado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminEncargadoService.updateEncargado(params['id'],this.encargado)
        .subscribe({
          next: (res:Encargado)=>{
        Swal.fire(
          'Éxito!',
          'El encargado ha sido actualizado.',
          'success'
        )
        setTimeout(() =>{
          this.router.navigate([`/admin/inicio`]);

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
      }
    })
    
  }
}

notOnlyWhitespace(control: AbstractControl) {
  if (control.value !== null && control.value.trim() === '') {
    return { notOnlyWhitespace: true };
  }
  return null;
}

get fechaNacimientoControl() {
  return this.encargado_formulario.get('fecha_nacimiento');
}

minDateValidator(control: AbstractControl) {
  const fechaNacimiento = new Date(control.value);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mesActual = hoy.getMonth();
  const mesNacimiento = fechaNacimiento.getMonth();

  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())) {
    // Si no ha cumplido años todavía
    edad--;
  }

  if (edad < 18) {
    return { minAge: true };
  }
  
  return null;
}

maxDateValidator(control: AbstractControl) {
  const fechaNacimiento = new Date(control.value);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mesActual = hoy.getMonth();
  const mesNacimiento = fechaNacimiento.getMonth();

  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())) {
    // Si no ha cumplido años todavía
    edad--;
  }

  if (edad > 70) {
    return { maxAge: true };
  }
  
  return null;
}

get nombreNoValido(): String{
  let mensaje:String='';
  if( this.encargado_formulario.get('nombre')?.errors?.['required'] && this.encargado_formulario.get('nombre')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.encargado_formulario.get('nombre')?.errors?.['pattern']){
    mensaje= "El nombre no puede contener números o carácteres especiales";
  }
  else if(this.encargado_formulario.get('nombre')?.errors?.['notOnlyWhitespace'] && this.encargado_formulario.get('nombre')?.touched) {
    mensaje= "El nombre no puede consistir solo en espacios en blanco.";
  }
  return mensaje}
get apellidopaternoNoValido(): String{
  let mensaje:String='';
  if( this.encargado_formulario.get('apellido_paterno')?.errors?.['required'] && this.encargado_formulario.get('apellido_paterno')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.encargado_formulario.get('apellido_paterno')?.errors?.['pattern']){
    mensaje= "El apellido paterno no puede contener números o carácteres especiales";
  }
  else if(this.encargado_formulario.get('apellido_paterno')?.errors?.['notOnlyWhitespace'] && this.encargado_formulario.get('apellido_paterno')?.touched) {
    mensaje= "El nombre no puede consistir solo en espacios en blanco.";
  }
  return mensaje
}
get apellidomaternoNoValido(): String {
  let mensaje:String='';
    if( this.encargado_formulario.get('apellido_materno')?.errors?.['required'] && this.encargado_formulario.get('apellido_materno')?.touched){
      mensaje= "El campo no puede estar vacío";
    }
    else if(this.encargado_formulario.get('apellido_materno')?.errors?.['pattern']){
      mensaje= "El apellido materno no puede contener números o carácteres especiales";
    }
    else if(this.encargado_formulario.get('apellido_materno')?.errors?.['notOnlyWhitespace'] && this.encargado_formulario.get('apellido_materno')?.touched) {
      mensaje= "El nombre no puede consistir solo en espacios en blanco.";
    }
    return mensaje
}
get fechaNoValido(){
  let mensaje:String='';
  if(this.encargado_formulario.get('fecha_nacimiento')?.errors?.['required'] && this.encargado_formulario.get('fecha_nacimiento')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.encargado_formulario.get('fecha_nacimiento')?.errors?.['minAge']) {
    mensaje= "El encargado debe ser mayor de edad";
  }
  else if(this.encargado_formulario.get('fecha_nacimiento')?.errors?.['maxAge']) {
    mensaje= "El encargado debe ser menor a 70 años";
  }
  return mensaje
}
get generoNoValido(){
  return this.encargado_formulario.get('genero')?.invalid && this.encargado_formulario.get('fecha_nacimiento')?.touched
}
get correoNoValido():string{
  let mensaje="";
  if(this.encargado_formulario.get('correo')?.errors?.['required'] && this.encargado_formulario.get('correo')?.touched){
      mensaje="El campo no puede estar vacío"
  }
  else if(this.encargado_formulario.get('correo')?.errors?.['pattern']){
    mensaje="Ingrese un formato de correo válido"
  }
  return mensaje;
        }
get telefonoNoValido(): String{
  let mensaje:String='';
  if( this.encargado_formulario.get('telefono')?.errors?.['required'] && this.encargado_formulario.get('telefono')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.encargado_formulario.get('telefono')?.errors?.['pattern']){
    mensaje="El número debe ser ingresado en el formato (XXX)-XXX-XXXX"
  }
  return mensaje
}

get confirmarContraseniaNoValida(){

  const pass1 = this.encargado_formulario.get('contraseña')?.value;
  const pass2 = this.encargado_formulario.get('confirmar_contraseña')?.value;

  return ( pass1.localeCompare(pass2, undefined, { sensitivity: 'case' }) === 0
    ) ? false : true;  }
}

