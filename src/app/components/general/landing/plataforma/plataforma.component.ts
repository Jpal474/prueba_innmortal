import { Component } from '@angular/core';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.component.html',
  styleUrls: ['./plataforma.component.css'],
})
export class PlataformaComponent {
  imagenes = [
    '../../../../../assets/recursos/landing/NUESTROS CLIENTES/icono1.svg',
    '../../../../../assets/recursos/landing/NUESTROS CLIENTES/icono2.svg',
    '../../../../../assets/recursos/landing/NUESTROS CLIENTES/icono3.svg',
    '../../../../../assets/recursos/landing/NUESTROS CLIENTES/icono4.svg',
  ];
  imagenesbeneficios=[
    '../../../../../assets/recursos/landing/BENEFICIOS/icon3_1.svg',
    '../../../../../assets/recursos/landing/BENEFICIOS/icon2.svg ',
    '../../../../../assets/recursos/landing/BENEFICIOS/icon3.svg ',
  ]
}
