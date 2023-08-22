import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mail } from 'src/app/interfaces/mail.interface';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css']
})
export class VerificarComponent implements OnInit{
  verificacion_formulario!: FormGroup
  destinatario:Mail ={
    destinatario:''
  }
  constructor(
    private authService : AuthService,
    private fb : FormBuilder
    ){}

 ngOnInit(): void {
   this.enviarMail();
   this.crearFormulario();
 }

 crearFormulario(){
  this.verificacion_formulario=this.fb.group({
    codigo:['', [Validators.required, Validators.pattern('^\d{6}$')]],
  })
  }

 enviarMail(){
  if (localStorage.getItem('usuario') !== null){
    this.destinatario.destinatario = localStorage.getItem('usuario')!
this.authService.enviarMail(this.destinatario)
.subscribe({
  next: (respuesta:string) =>{
    console.log('respuesta')
  },
  error: (e) => {
    console.log(e);
  }
})
}
 }

 verificar(){
  this.authService.verificar(this.verificacion_formulario.value)
  .subscribe({
    next: (res:boolean) => {
      if(res){
        localStorage.setItem('veririficado', 'true');
        Swal.fire({
          icon: 'success',
          title: 'Verificación Completada',
          text: 'Su proceso de verificación ha sido completado éxitosamente!',
        })
      }
    },
    error: (e:string) => {
      console.log(e)
    }
  })
 }
}
