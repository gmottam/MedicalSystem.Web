import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Profissional } from '../models/profissional.model';
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  constructor(private http: HttpClient) {}

  obterProfissionais(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(`${environment.apiBaseUrl}/Profissional/ObterLista`);
  }
}
