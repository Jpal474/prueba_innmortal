import { Routes} from '@angular/router';
import { RegistrosupermercadoComponent } from '../registrosupermercado/registrosupermercado.component';
import { DepartamentosComponent } from '../departamentos/departamentos.component';
import { TrabajadoresComponent } from '../trabajadores/trabajadores.component';
import { NuevotrabajadorComponent } from '../nuevotrabajador/nuevotrabajador.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { EditartrabajadorComponent } from '../editartrabajador/editartrabajador.component';
import { encargadoSupermercadoGuard } from 'src/app/guards/encargado-supermercado.guard';
import { CuentaComponent } from '../cuenta/cuenta.component';



export const ENCARGADO_ROUTES: Routes = [
    { path: 'registrar-supermercado', component:RegistrosupermercadoComponent, canActivate:[encargadoSupermercadoGuard] },
    { path: 'departamentos', component:DepartamentosComponent },
    { path: 'trabajadores', component:TrabajadoresComponent },
    { path: 'registrar-trabajador', component:NuevotrabajadorComponent },
    { path: 'editar-trabajador/:id', component:EditartrabajadorComponent },
    { path: 'ver-cuenta', component: CuentaComponent },
    {path:'pagenotfound', component:PagenotfoundComponent},
    {path:'**', pathMatch:'full', redirectTo:'pagenotfound'},
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];


