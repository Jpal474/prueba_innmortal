import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncargadoService } from 'src/app/services/encargado.service';
import { Supermercado } from '../../admin/interfaces/supermercado.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrosupermercado',
  templateUrl: './registrosupermercado.component.html',
  styleUrls: ['./registrosupermercado.component.css']
})
export class RegistrosupermercadoComponent implements OnInit{
  supermercado_formulario!: FormGroup
  supermercado:Supermercado={
    nombre:'',
    calle:'',
    numero:0,
    codigo_postal:0,
    colonia:'',
    estado:'',
    ciudad:'',
    razon_social:'',
    correo:'',
    telefono:'',
  }
  constructor(private fb:FormBuilder,
    private encargadoService:EncargadoService,
    private router:Router){
    
  }
  ngOnInit(): void {
    this.crearFormulario()
  }
  crearFormulario(){
  this.supermercado_formulario=this.fb.group({
    nombre:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
    calle:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\s,]+$')]],
    numero:[0, [Validators.required, Validators.pattern('^\\d+(?:-[A-Z])?$')]],
    codigo_postal:[0, [Validators.required, Validators.pattern(/^\d+$/)]],
    colonia:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
    estado:['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    ciudad:['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    razon_social:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
    correo:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    telefono:['', [Validators.required, Validators.pattern(/^\(\d{3}\)-\d{3}-\d{4}$/)]],
  
  })
  }
  guardarSupermercado(){
    console.log(this.supermercado_formulario.invalid)
    if(!this.supermercado_formulario.invalid){
    this.supermercado_formulario.value.numero=Number(this.supermercado_formulario.value.numero);
    this.supermercado=this.supermercado_formulario.value;
    console.log(this.supermercado)
    this.encargadoService.createSupermercado(this.supermercado)
    .subscribe(
      res=>{
        Swal.fire({
          icon: 'success',
          title: 'Registro Terminado',
          text: 'El nuevo Supermercado Ha Sido Registrado!',
        }),
        localStorage.setItem('id_supermercado', res.id!)
        this.router.navigate([`/encargado/departamentos`]);//guardo el id de mi supermercado en localstorage
      },
      err=>console.log(err)
    )

  

  }else{
    return Object.values( this.supermercado_formulario.controls ).forEach( control => {
        
      if ( control instanceof FormGroup ) {
        Object.values( control.controls ).forEach( control => control.markAsTouched() );
      } else {
        control.markAsTouched();
      }
      
      
    });
  }
}
get calleNoValido(): string{
  let mensaje=""
  if( this.supermercado_formulario.get('calle')?.errors?.['required'] && this.supermercado_formulario.get('calle')?.touched){
    mensaje= "El campo no puede estar vacío";
  }
  else if(this.supermercado_formulario.get('calle')?.errors?.['pattern']){
    mensaje= "La calle nombre no puede contener carácteres especiales";
  }
  return mensaje;
}

get numeroNoValido(): string{
  let mensaje=""
if( this.supermercado_formulario.get('numero')?.errors?.['required'] && this.supermercado_formulario.get('numero')?.touched){
  mensaje= "El campo no puede estar vacío";
}
else if(this.supermercado_formulario.get('numero')?.errors?.['pattern']){
  mensaje = "El campo sólo puede tener numero o letras en formato X ó XX-A";
}
return mensaje;
}

get nombreNoValido():string{
  let mensaje=""
if (this.supermercado_formulario.get('nombre')?.errors?.['required'] && this.supermercado_formulario.get('nombre')?.touched){
mensaje="El campo no puede estar vacío"
}
else if(this.supermercado_formulario.get('nombre')?.errors?.['pattern']){
mensaje="El campo no puede contener números o carácteres especiales"
}
return mensaje
}

get codigoPostalNoValido(){
let mensaje=""
if(this.supermercado_formulario.get('codigo_postal')?.errors?.['required'] && this.supermercado_formulario.get('codigo_postal')?.touched){
  mensaje="El campo no puede estar vacío"
}
else if(this.supermercado_formulario.get('codigo_postal')?.errors?.['pattern']){
  mensaje="El campo sólo puedo contener números"
}
return mensaje;
}
get coloniaNoValida(): string{
  let mensaje=""
  if (this.supermercado_formulario.get('colonia')?.errors?.['required'] && this.supermercado_formulario.get('colonia')?.touched){
      mensaje="El campo no puede estar vacío"
  }
  else if(this.supermercado_formulario.get('colonia')?.errors?.['pattern']){
      mensaje="El campo no acepta carácteres especiales"
  }
  return mensaje  
}

get telefonoNoValido():string{
let mensaje="";
if( this.supermercado_formulario.get('telefono')?.errors?.['required'] && this.supermercado_formulario.get('telefono')?.touched){
mensaje="El campo no puede estar vacío"
}
else if (this.supermercado_formulario.get('telefono')?.errors?.['pattern']){
mensaje="El número debe ser ingresado en el formato (XXX)-XXX-XXXX"
}
return mensaje;
}
get estadoNoValido():string{
  let mensaje="";
  if(this.supermercado_formulario.get('estado')?.errors?.['required'] && this.supermercado_formulario.get('estado')?.touched){
   mensaje = "El campo no puede estar vacío";
  }
  else if (this.supermercado_formulario.get('estado')?.errors?.['pattern']){
    mensaje="El campo no puede contener números o carácteres especiales"
  }
 return mensaje  
}
get ciudadNoValido():string{
  let mensaje=""
  if(this.supermercado_formulario.get('ciudad')?.errors?.['required'] && this.supermercado_formulario.get('ciudad')?.touched){
mensaje="El campo no puede estar vacío"
  }
  else if(this.supermercado_formulario.get('ciudad')?.errors?.['pattern']){
    mensaje="El campo no puede contener número o caracteres especiales"
  }
  return mensaje;
    }
get razonSocialNoValida(): string{
  let mensaje="";
      if(this.supermercado_formulario.get('razon_social')?.errors?.['required'] && this.supermercado_formulario.get('razon_social')?.touched){
          mensaje="El campo no puede estar vacío"
      }
      else if(this.supermercado_formulario.get('razon_social')?.errors?.['pattern']){
          mensaje = "El campo no puede contener caracteres especiales"
      }
    return mensaje;  
    }
get correoNoValido():string{
  let mensaje="";
  if(this.supermercado_formulario.get('correo')?.errors?.['required'] && this.supermercado_formulario.get('correo')?.touched){
      mensaje="El campo no puede estar vacío"
  }
  else if(this.supermercado_formulario.get('correo')?.errors?.['pattern']){
    mensaje="Ingrese un formato de correo válido"
  }
  return mensaje;
        }

}
