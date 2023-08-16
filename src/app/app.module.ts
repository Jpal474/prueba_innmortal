import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminModule } from './components/admin/admin/admin.module';
import { EncargadoModule } from './components/encargado/encargado/encargado.module';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { LandingModule } from './components/general/landing/landing.module';
import { CuentaComponent } from './components/encargado/cuenta/cuenta.component';
import { VerificarComponent } from './components/verificar/verificar.component';

@NgModule({
  declarations: [
    AppComponent,
    CuentaComponent,
    VerificarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    EncargadoModule,
    LandingModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
    
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
