import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";
import { FormatService } from "../../../../shared/services/format.service";
import { CEPService } from '../../../../shared/services/cep.service';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent, HttpClientModule],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private formatService: FormatService,
    private cepService: CEPService) 
  {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      cargo: ['', Validators.required],
      ddd: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log('Formulário enviado:', this.cadastroForm.value);
      // Aqui você pode adicionar a lógica para enviar os dados ao backend
    }
  }

  consultarCEP(): void {
    let cep = this.cadastroForm.get('cep')?.value;
    cep = cep.replace(/\D/g, '');
  
    if (cep && cep.length === 8) {
      this.cepService.consultarCEP(cep).subscribe(dados => {
        if (!dados.erro) {
          this.cadastroForm.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            uf: dados.uf
          });
        } else {
          console.error('CEP não encontrado.');
        }
      });
    } else {
      console.error('CEP inválido.');
    }
  }

  formatarTelefone(): void {
    const telefoneControl = this.cadastroForm.get('telefone');
    if (telefoneControl) {
      telefoneControl.setValue(this.formatService.formatarTelefone(telefoneControl.value), { emitEvent: false });
    }
  }

  formatarCEP(): void {
  const cepControl = this.cadastroForm.get('cep');
  if (cepControl) {
    cepControl.setValue(this.formatService.formatarCEP(cepControl.value), { emitEvent: false });
  }
}

  formatarDDD(): void {
    const dddControl = this.cadastroForm.get('ddd');
    if (dddControl) {
      dddControl.setValue(this.formatService.formatarDDD(dddControl.value), { emitEvent: false });
    }
  }
}