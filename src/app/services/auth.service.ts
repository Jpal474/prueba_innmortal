import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService } from '@auth0/angular-jwt'
import { Login } from '../interfaces/login.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL:string='http://localhost:3000'
  
public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  getAuth(correo:string, contraseña:string): Observable<Login> {
    return this.httpClient.post<Login>(`${this.BASE_URL}/auth/signin`, { correo, contraseña });
    
  }
  decodeUserFromToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }
  logOut(){
    localStorage.removeItem('token')
  }
}
