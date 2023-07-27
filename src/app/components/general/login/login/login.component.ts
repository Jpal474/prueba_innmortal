import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/interfaces/login.interface';
import { Router } from '@angular/router';
import {Encargado,EncargadoGenero} from 'src/app/interfaces/encargados.interface';
import { Usuario } from 'src/app/interfaces/user.interface';
import { EncargadoService } from 'src/app/services/encargado.service';
import { AdminService } from 'src/app/services/admin-encargado.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  imagen = '../../../../../assets/recursos/login/IMAGENES/login-wallpaper.jpg';
  usuario_formulario!: FormGroup;
  usuarioNotFound!:string
  passwordInvalid!:string
  // usuario_storage:Encargado={
  // id:'',
  // nombre:'',
  // apellido_paterno:'',
  // apellido_materno:'',
  // genero:EncargadoGenero.FEMENINO,
  // fecha_nacimiento:'',
  // correo:'',
  // telefono:'',
  // contraseña:''         
  //  }
  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router, private adminService:AdminService) {
    this.crearFormulario();
  }
  crearFormulario() {
    this.usuario_formulario = this.fb.group({
      correo: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }
  login() {
    console.log('Datos', this.usuario_formulario.value);
    this.authService.getAuth(this.usuario_formulario.value.correo, this.usuario_formulario.value.contraseña)
    .subscribe(
      (login:Login) => {
        this.usuarioNotFound = '';
        this.passwordInvalid = '';
        console.log('token front');
        console.log(login.accessToken);
        localStorage.setItem('token', login.accessToken);
        const usuario: Usuario = this.authService.decodeUserFromToken(
          login.accessToken
        );
        console.log(usuario);
        localStorage.setItem('usuario', usuario.correo)
        localStorage.setItem('id_usuario', usuario.id)
        localStorage.setItem('tipo', usuario.tipo)

        if(usuario.tipo==='encargado'){//si mi usuario es de tipo Encargado
         this.adminService.getEncargadoById(usuario.id!) //lo busca en la bd
        .subscribe((res:Encargado)=>{
          const encargado=res;
          if(encargado.supermercado!=null){//verifica que tenga un supermercado registrado
            localStorage.setItem('id_supermercado',encargado.supermercado.id!)//guardo el id del supermercado
            this.router.navigate([`/encargado/departamentos`]);//si lo tiene, lo manda a la vista de departamentos
          }
          else{
            this.router.navigate([`/encargado/registrar-supermercado`]);//si no lo tiene, lo manda a registar uno
          }
        })
        
      }else{
        this.router.navigate([`/admin/inicio`]);
      }

      },
      (err:any) => {
        const { error } = err;
        const { message, statusCode } = error;
        if (statusCode === 404) {
          this.usuarioNotFound = message;
        } else if (statusCode === 403) {
          this.passwordInvalid = message;
        }
        console.log(statusCode, message);
      }
    );
  }
}
