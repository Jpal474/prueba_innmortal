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
    nombre:['', Validators.required],
    calle:['', Validators.required],
    numero:[0, Validators.required],
    codigo_postal:[0, Validators.required],
    colonia:['', Validators.required],
    estado:['', Validators.required],
    ciudad:['', Validators.required],
    razon_social:['', Validators.required],
    correo:['', Validators.required],
    telefono:['', Validators.required, ],
  
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

  

  }
}
get calleNoValido(){
  return this.supermercado_formulario.get('calle')?.invalid && this.supermercado_formulario.get('calle')?.touched
}

get numeroNoValido(){
return this.supermercado_formulario.get('numero')?.invalid && this.supermercado_formulario.get('numero')?.touched
}

get nombreNoValido(){
return this.supermercado_formulario.get('nombre')?.invalid && this.supermercado_formulario.get('nombre')?.touched
}

get codigoPostalNoValido(){
return this.supermercado_formulario.get('codigo_postal')?.invalid && this.supermercado_formulario.get('codigo_postal')?.touched
}
get coloniaNoValida(){
  return this.supermercado_formulario.get('colonia')?.invalid && this.supermercado_formulario.get('colonia')?.touched
  }

get diasNoValidos(){
return this.supermercado_formulario.get('colonia')?.invalid && this.supermercado_formulario.get('colonia')?.touched
}

get telefonoNoValido(){
return this.supermercado_formulario.get('telefono')?.invalid && this.supermercado_formulario.get('telefono')?.touched
}
get estadoNoValido(){
  return this.supermercado_formulario.get('estado')?.invalid && this.supermercado_formulario.get('estado')?.touched
  }
get ciudadNoValido(){
    return this.supermercado_formulario.get('ciudad')?.invalid && this.supermercado_formulario.get('ciudad')?.touched
    }
get razonSocialNoValida(){
      return this.supermercado_formulario.get('razon_social')?.invalid && this.supermercado_formulario.get('razon_social')?.touched
      }
get correoNoValido(){
        return this.supermercado_formulario.get('correo')?.invalid && this.supermercado_formulario.get('correo')?.touched
        }

}
