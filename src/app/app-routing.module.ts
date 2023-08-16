import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/general/login/login/login.component';
import { PlataformaComponent } from './components/general/landing/plataforma/plataforma.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { EncargadoComponent } from './components/encargado/encargado/encargado.component';
import { ADMIN_ROUTES } from './components/admin/admin/admin.routes';
import { ENCARGADO_ROUTES } from './components/encargado/encargado/encargado.routes';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { encargadoGuard } from './guards/encargado.guard';
import { VerificarComponent } from './components/verificar/verificar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'verificar', component: VerificarComponent },
  {path:'landing', component: PlataformaComponent,},
  {path:'admin', component: AdminComponent, canActivate:[authGuard, adminGuard] ,children:ADMIN_ROUTES},
  {path:'encargado', component: EncargadoComponent,canActivate:[authGuard, encargadoGuard], children:ENCARGADO_ROUTES},
  {path:'**', pathMatch:'full', redirectTo:'landing'},
    


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
