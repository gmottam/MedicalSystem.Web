import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importando o HttpClient
import { Observable, of } from 'rxjs';  // Importando o Observable e of
import { catchError } from 'rxjs/operators';  // Importando o operador catchError

@Injectable({
  providedIn: 'root'
})
export class CEPService {
  private readonly viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  consultarCEP(cep: string): Observable<any> {
    return this.http.get<any>(`${this.viaCepUrl}/${cep}/json`).pipe(
      catchError(error => {
        console.error('Erro ao consultar CEP:', error);
        return of({ erro: true });
      })
    );
  }
}
