import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateEncargado } from '../interfaces/update-encargado.interface';
import { Supermercado } from '../interfaces/supermercado.interface';
import { Encargado } from '../interfaces/encargados.interface';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

 BASE_URL:string='http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  getEncargados(): Observable<Encargado[]>{
    return this.httpClient.get <Encargado[]>(`${this.BASE_URL}/auth`) 
}
  
  getEncargadoById(id:string): Observable<Encargado>{
      return this.httpClient.get <Encargado>(`${this.BASE_URL}/auth/${id}`) 
  }

  getEncargadoBySuperId(id:string): Observable<Encargado>{
    return this.httpClient.get<Encargado>(`${this.BASE_URL}/auth/encargado/${id}`)
  }

  createEncargado(encargado:Encargado):Observable<Encargado>{
    console.log(`Encargado ${encargado}`)
    return this.httpClient.post<Encargado>(`${this.BASE_URL}/auth`, encargado )
  }

  updateEncargado(id: string, encargado: Encargado): Observable<Encargado> {
    return this.httpClient.patch<Encargado>(`${this.BASE_URL}/auth/${id}/editar`, encargado); //hago un request a una url definida en el back 
    //la cual buscará a mi encargado a través de su id para después actualizar sus datos
  }

  getSupermercados(): Observable<Supermercado[]>{
    return this.httpClient.get<Supermercado[]>(`${this.BASE_URL}/supermercados`)
  }

  getSupermercado(parametro:string | Encargado): Observable<Supermercado>{
    return this.httpClient.get<Supermercado>(`${this.BASE_URL}/supermercados/${parametro}`)
  }

}
