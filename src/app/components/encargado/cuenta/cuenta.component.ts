import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-encargado.service';
import { Departamento } from '../../admin/interfaces/departamento.interface';
import { EncargadoService } from 'src/app/services/encargado.service';
import { Trabajador } from '../../admin/interfaces/trabajador.interface';
import { Encargado, EncargadoGenero } from '../../admin/interfaces/encargados.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  imagen_formulario!: FormGroup
  encargado:Encargado={
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    genero:EncargadoGenero.FEMENINO,
    fecha_nacimiento:'',
    correo:'',
    telefono:'',
    contraseña:'',
    imagen:'',
  }
  departamentos:Departamento[]=[]
  trabajadores:Trabajador[]=[]
  trabajadores_num:Number[]=[]
  imgURL!:string

  public file!: File;

constructor(
  private adminService:AdminService,
  private encargadoService:EncargadoService,
  private fb:FormBuilder,
  public sanitizer: DomSanitizer
  ){
    this.crearFormulario();
  }

 ngOnInit(): void {
   this.getEncargado()
 }

 crearFormulario(){
  this.imagen_formulario=this.fb.group({
    imagen:['',]
  
  })
}

 getEncargado(){
  if (localStorage.getItem('id_usuario') !== null ){
  this.adminService.getEncargadoById(localStorage.getItem('id_usuario')!)
  .subscribe({
    next: (res:Encargado) => {
      this.encargado=res
      if( res.imagen ) {
       const blob = this.base64ToBlob(res.imagen, "image/png")
       console.log(blob);
        const imgFile:File = new File([blob], 'imagen.png');
        this.imgURL = URL.createObjectURL(imgFile);
      }
      else{
        this.imgURL="../../../../assets/recursos/super-admin/CARD ENCARGADO/avatar_encargado.svg"
      }
      console.log(`Img URL ${this.imgURL}`)
      console.log(`Encargado ${this.encargado}`)
    },
    error: (e) => {
      Swal.fire({
        icon: 'error',
        text: e,
      })
    }
  })
  
}
}

base64ToBlob(base64String: string, mimeType: string): Blob {
  const byteCharacters = atob(base64String);
  const byteArrays = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }

  return new Blob([byteArrays], { type: mimeType });
}


  previewImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const previewImage = document.getElementById('preview-image') as HTMLImageElement;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]

    if (fileInput.files && fileInput.files[0]) {
      const maxSize = 1024 * 1024; // Tamaño máximo en bytes (1MB)
    if(allowedTypes.includes(fileInput.files[0].type)){
      if(fileInput.files[0].size < maxSize){
      
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          previewImage.src = e.target.result.toString();
        }
      };

      reader.readAsDataURL(fileInput.files[0]);
      console.log(fileInput.files[0],'----->');
      this.file = fileInput.files[0];
      this.guardarImagenPerfil()
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tamaño de Archivo Mayor a 1MB',
      })
    }
      
    }
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Formato de Archivo No Admitido',
    })
  }
  }

  guardarImagenPerfil(){
    if(!this.imagen_formulario.invalid){
    console.log(this.imagen_formulario.value);
    
    this.encargadoService.uploadImagenPerfil(localStorage.getItem('id_usuario')!,this.file )
    .subscribe({
      next: (res:any) => {
        console.log(res)
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
  }

 get imagenNoValida(){
    let mensaje='';
    if(this.imagen_formulario.get('imagen')?.errors?.['invalidSize']){
      mensaje="El tamaño de la imagen deber menor a 1MB"
    }
    return mensaje
  }
 
}
