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
  departamentos!:Departamento[]
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
    this.getDepartamentos();
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
    id:['', [Validators.required, Validators.pattern(/^FV-\d+$/)]],
    nombre:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
    apellidos:['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
    dias_laborales:['', Validators.required],
    telefono:['', [Validators.required, Validators.pattern(/^\(\d{3}\)-\d{3}-\d{4}$/)]],
    departamento:['', Validators.required],
  
  
  })
  }

  getDepartamentos(){
    this.encargadoService.getDepartamentosBySuperId(localStorage.getItem('id_supermercado')!)
    .subscribe({
      next: (res:Departamento[]) => {
        this.departamentos=res
        console.log(`Encargado ${this.departamentos}`)
      }
    })
  }



  actualizarTrabajador(){
    if(!this.trabajador_formulario.invalid){
    const params = this.activadedRoute.snapshot.params;
    this.trabajador=this.trabajador_formulario.value;
    console.log(this.trabajador)
    this.encargadoService.getDepartamentoByNombre(this.trabajador_formulario.value.departamento.toLowerCase())
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
  let mensaje:String='';
  if( this.trabajador_formulario.get('id')?.errors?.['required'] && this.trabajador_formulario.get('id')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.trabajador_formulario.get('id')?.errors?.['pattern']){
    mensaje= "El ID deber ser de la forma FV-XXX";
  }
  return mensaje
}

get nombreNoValido(){
  let mensaje:String='';
  if( this.trabajador_formulario.get('nombre')?.errors?.['required'] && this.trabajador_formulario.get('nombre')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.trabajador_formulario.get('nombre')?.errors?.['pattern']){
    mensaje= "El nombre no puede contener números o carácteres especiales";
  }
  return mensaje
}

get apellidosNoValido(){
  let mensaje:String='';
  if( this.trabajador_formulario.get('apellidos')?.errors?.['required'] && this.trabajador_formulario.get('apellidos')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.trabajador_formulario.get('apellidos')?.errors?.['pattern']){
    mensaje= "El/Los apellidos no pueden contener números o carácteres especiales";
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
  else if(this.trabajador_formulario.get('telefono')?.errors?.['pattern']){
    mensaje="El número debe ser ingresado en el formato (XXX)-XXX-XXXX"

  }
  return mensaje;
}



}
