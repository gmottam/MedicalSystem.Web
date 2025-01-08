import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  obterUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiBaseUrl}/Usuario/ObterLista`);
  }
}
