import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-encargado.service';
import { EncargadoGenero, Encargado } from '../../interfaces/encargados.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    .subscribe((res:Encargado)=>{
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
    })
  }
}

crearFormulario(){
  this.encargado_formulario=this.fb.group({
    nombre:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
    apellido_paterno:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
    apellido_materno:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
    fecha_nacimiento:['', Validators.required],
    genero:['', Validators.required],
    correo:['', Validators.required],
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
    if(this.encargado_formulario.value.contraseña.length === ''){
      this.encargado_formulario.value.contraseña=this.encargado.contraseña;
    }
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
        .subscribe((res:Encargado)=>{
        Swal.fire(
          'Éxito!',
          'El encargado ha sido actualizado.',
          'success'
        )
      })
      this.router.navigate([`/admin/inicio`]);
      }
    })
    

}


get nombreNoValido(): String{
  let mensaje:String='';
  if( this.encargado_formulario.get('nombre')?.errors?.['required'] && this.encargado_formulario.get('nombre')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.encargado_formulario.get('nombre')?.errors?.['pattern']){
    mensaje= "El nombre no puede contener números o carácteres especiales";
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

  return ( pass1 === pass2 
  ) ? false : true;  
}



}
