import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";
import { FormatService } from "../../../../shared/services/format.service";
import { CEPService } from '../../../../shared/services/cep.service';
import { Profissional } from '../../models/profissional.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-editar-profissional',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent],
  templateUrl: './editar-profissional.component.html',
  styleUrls: ['./editar-profissional.component.css']
})
export class EditarProfissionalComponent implements OnInit {

  cadastroForm: FormGroup = this.fb.group({});
  profissionalId: string = '';
  profissional: Profissional[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private formatService: FormatService,
    private cepService: CEPService) 
  {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ddd: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      especialidade: ['', Validators.required],
      registroProfissional: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.profissionalId = params.get('id')!;
      this.loadProfissional();
    });
  }

  loadProfissional() {
    this.http.get<Profissional>(`${environment.apiBaseUrl}/profissional/${this.profissionalId}`).subscribe(paciente => {
      this.cadastroForm.patchValue({
        nome: paciente.nome,
        email: paciente.email,
        ddd: paciente.ddd,
        telefone: paciente.telefone,
        dataNascimento: paciente.dataNascimento,
        endereco: paciente.endereco
      });
    });
  }

  onSubmit() {
    if (this.cadastroForm.invalid) {
      return;
    }
    const profissionalAtualizado = this.cadastroForm.value;
    profissionalAtualizado.id = this.profissionalId;

    this.http.put(`${environment.apiBaseUrl}/profissional/${this.profissionalId}`, profissionalAtualizado)
      .subscribe({
        next: (response) => {
          console.log('Profissional atualizado:', response);
          this.router.navigate(['/consultar-profissional']);
        },
        error: (error) => {
          console.error('Erro ao atualizar profissional:', error);
        }
      });
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
