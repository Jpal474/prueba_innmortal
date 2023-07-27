import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EncargadoComponent } from './encargado.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarencargadoComponent } from '../shared/sidebarencargado/sidebarencargado.component';
import { DepartamentosComponent } from '../departamentos/departamentos.component';
import { EditartrabajadorComponent } from '../editartrabajador/editartrabajador.component';
import { NuevotrabajadorComponent } from '../nuevotrabajador/nuevotrabajador.component';
import { RegistrosupermercadoComponent } from '../registrosupermercado/registrosupermercado.component';
import { TrabajadoresComponent } from '../trabajadores/trabajadores.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';



@NgModule({
  declarations: [
    EncargadoComponent,
    HeaderComponent,
    SidebarencargadoComponent,
    DepartamentosComponent,
    EditartrabajadorComponent,
    NuevotrabajadorComponent,
    RegistrosupermercadoComponent,
    TrabajadoresComponent,
    PagenotfoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class EncargadoModule { }
