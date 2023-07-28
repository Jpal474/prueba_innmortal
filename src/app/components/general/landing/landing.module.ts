import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformaComponent } from './plataforma/plataforma.component';
import { LandingComponent } from './landing.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { LoginComponent } from '../login/login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LandingComponent,
    PlataformaComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class LandingModule { }
