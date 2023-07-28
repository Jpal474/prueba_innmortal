import { Routes, RouterModule } from '@angular/router';
import { EncargadosComponent } from '../encargados/encargados.component';
import { NuevoencargadoComponent } from '../encargados/nuevoencargado/nuevoencargado.component';
import { EditarencargadoComponent } from '../encargados/editarencargado/editarencargado.component';
import { SupermercadosComponent } from '../supermercado/supermercados/supermercados.component';
import { DetallessupermercadoComponent } from '../supermercado/detallessupermercado/detallessupermercado.component';


export const ADMIN_ROUTES: Routes = [
    { path: 'inicio', component: EncargadosComponent },
    { path: 'registrar', component: NuevoencargadoComponent },
    { path: 'editar/:id', component: EditarencargadoComponent },
    { path: 'supermercados', component: SupermercadosComponent },
    { path: 'supermercado/:id', component: DetallessupermercadoComponent },
    {path:'**', pathMatch:'full', redirectTo:'inicio'},
   
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];


