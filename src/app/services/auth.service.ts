import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService } from '@auth0/angular-jwt'
import { Login } from '../interfaces/login.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Mail } from '../interfaces/mail.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL:string='http://localhost:3000'
  
public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private router:Router
    ) { }

  getAuth(correo:string, contraseña:string): Observable<Login> {
    return this.httpClient.post<Login>(`${this.BASE_URL}/auth/signin`, { correo, contraseña });
    
  }
  decodeUserFromToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  enviarMail(destinatario:Mail){
    return this.httpClient.post<string>(`${this.BASE_URL}/auth/send`, destinatario);
  }

  verificar(codigo:string){
    const id=localStorage.getItem('id_usuario'!)
    return this.httpClient.post<boolean>(`${this.BASE_URL}/auth/verificar/${id}`, codigo);
  }

  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('id_supermercado')
    localStorage.clear();
    this.router.navigate(['login'])
    

    
  }
}
