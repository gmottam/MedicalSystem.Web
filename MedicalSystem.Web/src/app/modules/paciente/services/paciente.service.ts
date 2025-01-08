import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Paciente } from '../models/paciente.model';
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = `${environment.apiBaseUrl}/Paciente`;

  constructor(private http: HttpClient) {}

  obterPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/ObterLista`);
  }

  obterPorId(id: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/ObterPorId?id=${id}`);
  }

  cadastrarPaciente(paciente: Paciente): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Cadastrar`, paciente);
  }

  editarPaciente(paciente: Paciente): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/Editar`, paciente);
  }

  excluirPaciente(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Deletar?id=${id}`);
  }
}
