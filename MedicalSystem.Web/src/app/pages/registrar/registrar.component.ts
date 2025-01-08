import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  // Formulário de registro com campos de nome, email, telefone e data de nascimento
  registerForm: FormGroup;

  constructor() {
    // Inicializa o formulário com os controles e validações
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required])
    });
  }

  // Método para o envio do formulário
  onSubmit() {
    if (this.registerForm.valid) {
      // Lógica para enviar os dados do formulário
      console.log('Formulário enviado:', this.registerForm.value);
    } else {
      // Marca todos os campos como tocados para mostrar mensagens de erro
      this.registerForm.markAllAsTouched();
    }
  }
}
