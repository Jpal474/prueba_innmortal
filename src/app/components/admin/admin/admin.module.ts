import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HeaderadminComponent } from '../shared/headeradmin/headeradmin.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { EncargadosComponent } from '../encargados/encargados.component';
import { EditarencargadoComponent } from '../encargados/editarencargado/editarencargado.component';
import { NuevoencargadoComponent } from '../encargados/nuevoencargado/nuevoencargado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SupermercadosComponent } from '../supermercado/supermercados/supermercados.component';
import { DetallessupermercadoComponent } from '../supermercado/detallessupermercado/detallessupermercado.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderadminComponent,
    SidebarComponent,
    EncargadosComponent,
    EditarencargadoComponent,
    NuevoencargadoComponent,
    SupermercadosComponent,
    DetallessupermercadoComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
