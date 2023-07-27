import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supermercado } from '../interfaces/supermercado.interface';
import { Observable } from 'rxjs';
import { Trabajador } from '../interfaces/trabajador.interface';
import { Departamento } from '../interfaces/departamento.interface';
import { DepartamentoSupermercado } from '../interfaces/departamento-supermercado.interface';
import { TrabajadorDepartamento } from '../interfaces/trabajador-departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {
  

  BASE_URL:string='http://localhost:3000' 
  headers= new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  constructor(private httpClient: HttpClient
    ) {}

  createSupermercado(supermercado:Supermercado): Observable<Supermercado>{
    return this.httpClient.post<Supermercado>(`${this.BASE_URL}/supermercados`, supermercado)
  }

  getDepartamentosBySuperId(id:string){
    return this.httpClient.get<Departamento[]>(`${this.BASE_URL}/departamentos/search/${id}`)
  }

  getDepartamentoById(id: string){
    return this.httpClient.get<Departamento>(`${this.BASE_URL}/departamentos/departamento/${id}`)
  }

  getDepartamentoByNombre(nombre:string):Observable<Departamento>{
    return this.httpClient.get<Departamento>(`${this.BASE_URL}/departamentos/${nombre}`)
  }

  createDepartamento(departamento:DepartamentoSupermercado):Observable<Departamento>{
    console.log(`Departamento en Service ${departamento}`)
    return this.httpClient.post<Departamento>(`${this.BASE_URL}/departamentos`, departamento )
  }

  deleteDepartamento(id:string):Observable<Departamento>{
    return this.httpClient.delete<Departamento>(`${this.BASE_URL}/departamentos/${id}`);
  }

  getTrabajadores(id:string): Observable<Trabajador[]>{
    return this.httpClient.get <Trabajador[]>(`${this.BASE_URL}/trabajadores/${id}`)
  }

  getTrabajador(id:string): Observable<Trabajador>{
    return this.httpClient.get <Trabajador>(`${this.BASE_URL}/trabajadores/trabajador/${id}`) 
  }

  createTrabajador(trabajador:TrabajadorDepartamento):Observable<Trabajador>{
    return this.httpClient.post<Trabajador>(`${this.BASE_URL}/trabajadores`, trabajador )
  }
  updateTrabajador(id: string, trabajador: Trabajador): Observable<Trabajador> {
    return this.httpClient.patch<Trabajador>(`${this.BASE_URL}/trabajadores/${id}/editar`, trabajador); //hago un request a una url definida en el back 
    //la cual buscará a mi encargado a través de su id para después actualizar sus datos
  }

   deleteTrabajador(id: string): Observable<Trabajador> {
    console.log(id);
    return this.httpClient.delete<Trabajador>(`${this.BASE_URL}/trabajadores/${id}`);
  }

}
