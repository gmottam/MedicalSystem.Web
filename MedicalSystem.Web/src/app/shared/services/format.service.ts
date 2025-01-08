import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {
  constructor() {}

  formatarTelefone(value: string): string {
    if (!value) return '';
    value = value.replace(/\D/g, '').substring(0, 9);
    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{1,4})/, '$1-$2');
    }
    return value;
  }

  formatarCEP(value: string): string {
    if (!value) return '';
    value = value.replace(/\D/g, '').substring(0, 8);
    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    return value;
  }

  formatarDDD(value: string): string {
    if (!value) return '';
    return value.replace(/\D/g, '').substring(0, 2);
  }
}
