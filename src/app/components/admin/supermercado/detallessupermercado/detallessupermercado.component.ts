import { Component, OnInit } from '@angular/core';
import { Supermercado } from '../../interfaces/supermercado.interface';
import { AdminService } from 'src/app/services/admin-encargado.service';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/interfaces/departamento.interface';
import { Trabajador } from 'src/app/interfaces/trabajador.interface';
import { EncargadoService } from 'src/app/services/encargado.service';
import { Encargado, EncargadoGenero } from 'src/app/interfaces/encargados.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallessupermercado',
  templateUrl: './detallessupermercado.component.html',
  styleUrls: ['./detallessupermercado.component.css']
})
export class DetallessupermercadoComponent implements OnInit{
p: number = 1;
p2: number = 1;
supermercado:Supermercado={
  nombre: '',
  calle: '',
  numero: 0,
  colonia: '',
  estado: '',
  ciudad: '',
  razon_social: '',
  correo: '',
  codigo_postal: 0,
  telefono: '',

}  
encargado:Encargado={
  nombre:'',
  apellido_paterno:'',
  apellido_materno:'',
  genero:EncargadoGenero.FEMENINO,
  fecha_nacimiento:'',
  correo:'',
  telefono:'',
  imagen:'',
  contraseña:''
}
imgURL !:string
departamentos:Departamento[]=[]
trabajadores:Trabajador[]=[]
trabajadores_num:Number[]=[]

  constructor(
    private adminService: AdminService,
    private encargadoService:EncargadoService,
    private activadedRoute:ActivatedRoute
    ){}

  ngOnInit(): void {
    const params = this.activadedRoute.snapshot.params;
    if(params){
      this.adminService.getSupermercado(params['id'])
      .subscribe((res:Supermercado)=>{
        console.log(res)
        this.supermercado=res;
        this.getEncargado()
        this.getDepartamentos()
      })
    }

}//cierre de oninit

getEncargado(){
  const params = this.activadedRoute.snapshot.params;
  if (params){
  this.adminService.getEncargadoBySuperId(params['id'])
  .subscribe({
    next: (res:Encargado) => {
      this.encargado=res
      if(res.imagen !== null){
      const blob = this.base64ToBlob(res.imagen!, "image/png")
      console.log(blob);
       const imgFile:File = new File([blob], 'imagen.png');
       this.imgURL = URL.createObjectURL(imgFile);
      }
      else{
        this.imgURL= "../../../../../assets/recursos/super-admin/CARD ENCARGADO/avatar_encargado.svg"
      }

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
getDepartamentos(){
  const params = this.activadedRoute.snapshot.params;
  if(params){
this.encargadoService.getDepartamentosBySuperId(params['id'])
.subscribe({
  next: (res:Departamento[]) => {
    this.departamentos=res;
    this.getTrabajadores(this.departamentos)
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

getTrabajadores(dptos:Departamento[]){
  for (let i = 0; i < dptos.length; i++) {
    this.encargadoService.getTrabajadores(dptos[i].id!)
    .subscribe({
      next:(res:Trabajador[]) => {
        this.trabajadores_num[i]=res.length
        for (let j=0; j<res.length;j++){
          this.trabajadores.push(res[j])
        }
        
        console.log(`Trabajadores ${this.trabajadores}`);
        console.log(`Numero de Trabajadores ${this.trabajadores_num}`)
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

}//cierre de clase
