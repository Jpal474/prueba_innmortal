import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  PatternValidator,
  Validators,
} from '@angular/forms';
import {
  Encargado,
  EncargadoGenero,
} from '../../interfaces/encargados.interface';
import { AdminService } from 'src/app/services/admin-encargado.service';
import Swal from 'sweetalert2';
import { MustMatch } from './match-password.validator';
import { Router } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-nuevoencargado',
  templateUrl: './nuevoencargado.component.html',
  styleUrls: ['./nuevoencargado.component.css'],
})
export class NuevoencargadoComponent {
  encargado_formulario!: FormGroup;
  fieldTextType: boolean = false;
  fieldTextType2: boolean = false;
  encargado: Encargado = {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    genero: EncargadoGenero.MASCULINO,
    correo: '',
    telefono: '',
    contraseña: '',
    tipo: 'encargado',
  };

  constructor(
    private fb: FormBuilder,
    private adminEncargadoService: AdminService,
    private router: Router
  ) {
    this.crearFormulario();
  }
  crearFormulario() {
    this.encargado_formulario = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$'),
          this.notOnlyWhitespace,
        ],
      ],
      apellido_paterno: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-0-9]*$/),
          this.notOnlyWhitespace,
        ],
      ],
      apellido_materno: [
        '',
        [
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-0-9]*$/)
        ],
      ],
      fecha_nacimiento: [
        '',
        [Validators.required, this.minDateValidator, this.maxDateValidator],
      ],
      genero: ['', Validators.required],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
        ],
      ],
      telefono: ['', Validators.required],
      contraseña: ['', [Validators.required, this.notOnlyWhitespace]],
      confirmar_contraseña: ['', [Validators.required, this.notOnlyWhitespace]],
    });
  }

  guardarEncargado() {
    console.log(this.encargado_formulario);
    if (!this.encargado_formulario.invalid) {
      const { confirmar_contraseña: _, ...nuevoEncargado } =
        this.encargado_formulario.value;
      nuevoEncargado.correo = nuevoEncargado.correo.toLowerCase();
      this.encargado = nuevoEncargado;
      this.encargado.tipo = 'encargado';
      console.log(this.encargado);
      this.adminEncargadoService.createEncargado(this.encargado).subscribe({
        next: (res: Encargado) => {
          Swal.fire({
            icon: 'success',
            title: 'Registro Terminado',
            text: 'El nuevo Encargado Ha Sido Registrado!',
          });
          this.router.navigate([`/admin/inicio`]);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
          });
        },
      });
    } else {
      console.log(this.encargado_formulario.invalid);
      
      return Object.values(this.encargado_formulario.controls).forEach(
        (control) => {
          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach((control) =>
              control.markAsTouched()
            );
          } else {
            control.markAsTouched();
          }
        }
      );
    }
  }

  notOnlyWhitespace(control: AbstractControl) {
    if (control.value !== null && control.value.trim() === '') {
      return { notOnlyWhitespace: true };
    }
    return null;
  }

  minDateValidator(control: AbstractControl) {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    console.log('fecha', fechaNacimiento);
    console.log('hoy', hoy);

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = fechaNacimiento.getMonth();
    console.log('edad', edad);
    console.log('mesActual', mesActual);
    console.log('mesNacimiento', mesNacimiento);

    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      // Si no ha cumplido años todavía
      edad--;
    }

    if (edad < 18) {
      console.log('entra al if');

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

    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      // Si no ha cumplido años todavía
      edad--;
    }

    if (edad > 70) {
      return { maxAge: true };
    }

    return null;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  get nombreNoValido() {
    let mensaje: String = '';
    if (
      this.encargado_formulario.get('nombre')?.errors?.['required'] &&
      this.encargado_formulario.get('nombre')?.touched
    ) {
      mensaje = 'El campo no puede estar vacío';
    } else if (this.encargado_formulario.get('nombre')?.errors?.['pattern']) {
      mensaje = 'El nombre no puede contener números o carácteres especiales';
    } else if (
      this.encargado_formulario.get('nombre')?.errors?.['notOnlyWhitespace'] &&
      this.encargado_formulario.get('nombre')?.touched
    ) {
      mensaje = 'El nombre no puede consistir solo en espacios en blanco.';
    }
    return mensaje;
  }
  get apellidopaternoNoValido() {
    let mensaje: String = '';
    if (
      this.encargado_formulario.get('apellido_paterno')?.errors?.['required'] &&
      this.encargado_formulario.get('apellido_paterno')?.touched
    ) {
      mensaje = 'El campo no puede estar vacío';
    } else if (
      this.encargado_formulario.get('apellido_paterno')?.errors?.['pattern']
    ) {
      mensaje =
        'El apellido paterno no puede contener números o carácteres especiales';
    } else if (
      this.encargado_formulario.get('apellido_paterno')?.errors?.[
        'notOnlyWhitespace'
      ] &&
      this.encargado_formulario.get('apellido_paterno')?.touched
    ) {
      mensaje = 'El campo no puede consistir solo en espacios en blanco.';
    }
    return mensaje;
  }
  get apellidomaternoNoValido() {
    let mensaje: String = '';
    if (
      this.encargado_formulario.get('apellido_materno')?.errors?.['required'] &&
      this.encargado_formulario.get('apellido_materno')?.touched
    ) {
      mensaje = 'El campo no puede estar vacío';
    } else if (
      this.encargado_formulario.get('apellido_materno')?.errors?.['pattern']
    ) {
      mensaje =
        'El apellido materno no puede contener números o carácteres especiales';
    } else if (
      this.encargado_formulario.get('apellido_materno')?.errors?.[
        'notOnlyWhitespace'
      ] &&
      this.encargado_formulario.get('apellido_materno')?.touched
    ) {
      mensaje = 'El campo no puede consistir solo en espacios en blanco.';
    }
    return mensaje;
  }
  get fechaNoValido() {
    let mensaje: String = '';
    if (
      this.encargado_formulario.get('fecha_nacimiento')?.errors?.['required'] &&
      this.encargado_formulario.get('fecha_nacimiento')?.touched
    ) {
      mensaje = 'El campo no puede estar vacío';
    } else if (
      this.encargado_formulario.get('fecha_nacimiento')?.errors?.['minAge']
    ) {
      mensaje = 'El Encargado No Puede Ser Menor de Edad';
    } else if (
      this.encargado_formulario.get('fecha_nacimiento')?.errors?.['maxAge']
    ) {
      mensaje = 'El Encargado No Puede Ser Menor de Edad';
    }
    return mensaje;
  }
  get generoNoValido() {
    return (
      this.encargado_formulario.get('genero')?.invalid &&
      this.encargado_formulario.get('genero')?.touched
    );
  }
  get correoNoValido() {
    let mensaje: String = '';
    if (
      this.encargado_formulario.get('correo')?.errors?.['required'] &&
      this.encargado_formulario.get('correo')?.touched
    ) {
      mensaje = 'El campo no puede estar vacío';
    } else if (this.encargado_formulario.get('correo')?.errors?.['pattern']) {
      mensaje =
        'El apellido materno no puede contener números o carácteres especiales';
    }
    return mensaje;
  }
  get telefonoNoValido() {
    let mensaje: String = '';
    if (
      this.encargado_formulario.get('telefono')?.errors?.['required'] &&
      this.encargado_formulario.get('telefono')?.touched
    ) {
      mensaje = 'El campo no puede estar vacío';
    }
    return mensaje;
  }
  get contraseniaNoValido() {
    return (
      this.encargado_formulario.get('contraseña')?.invalid &&
      this.encargado_formulario.get('contraseña')?.touched
    );
  }
  get confirmarContraseniaNoValida() {
    const pass1 = this.encargado_formulario.get('contraseña')?.value;
    const pass2 = this.encargado_formulario.get('confirmar_contraseña')?.value;

    return pass1.localeCompare(pass2, undefined, { sensitivity: 'case' }) === 0
      ? false
      : true;
  }
}
