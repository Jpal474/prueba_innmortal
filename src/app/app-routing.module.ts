import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/general/login/login/login.component';
import { PlataformaComponent } from './components/general/landing/plataforma/plataforma.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { EncargadoComponent } from './components/encargado/encargado/encargado.component';
import { ADMIN_ROUTES } from './components/admin/admin/admin.routes';
import { ENCARGADO_ROUTES } from './components/encargado/encargado/encargado.routes';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'landing', component: PlataformaComponent},
  {path:'admin', component: AdminComponent, children:ADMIN_ROUTES },
  {path:'encargado', component: EncargadoComponent, children:ENCARGADO_ROUTES},
  {path:'**', pathMatch:'full', redirectTo:'landing'},
    


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
