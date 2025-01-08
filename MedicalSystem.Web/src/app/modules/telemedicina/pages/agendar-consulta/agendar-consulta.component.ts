import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

interface Agendamento {
  profissionalId: string;
  pacienteId: string;
  data: string;
  inicio: string;
  fim: string;
  diagnostico: string;
  observacoes: string;
  notificar: boolean;
  tipoConsulta: string;
  status: string;
}

@Component({
  selector: 'app-agendar-consulta',
  standalone: true,
  imports: [FormsModule, SidebarComponent, CommonModule],
  templateUrl: './agendar-consulta.component.html',
  styleUrls: ['./agendar-consulta.component.css']
})
export class AgendarConsultaCompoment implements OnInit {

  profissionais = [
    { id: '1', nome: 'Dr. João Silva' },
    { id: '2', nome: 'Dra. Maria Souza' },
    { id: '3', nome: 'Dr. Carlos Oliveira' }
  ];

  pacientes = [
    { id: '1', nome: 'João Silva', email: 'joao@email.com', telefone: '123456789', dataNascimento: '1985-02-20' },
    { id: '2', nome: 'Maria Oliveira', email: 'maria@email.com', telefone: '987654321', dataNascimento: '1990-07-15' },
    { id: '3', nome: 'Carlos Souza', email: 'carlos@email.com', telefone: '564738291', dataNascimento: '1980-11-05' },
  ];

  agendamento: Agendamento = {
    profissionalId: '',
    pacienteId: '',
    data: '',
    inicio: '',
    fim: '',
    diagnostico: '',
    observacoes: '',
    notificar: false,
    tipoConsulta: '',
    status: ''
  };

  constructor(
    private route: ActivatedRoute, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // Obter IDs do paciente e do profissional da URL
    const pacienteId = this.route.snapshot.paramMap.get('pacienteId');
    const profissionalId = this.route.snapshot.paramMap.get('profissionalId');
    
    // Encontrar e preencher dados do paciente
    if (pacienteId) {
      const paciente = this.pacientes.find(p => p.id === pacienteId);
      if (paciente) {
        this.agendamento.pacienteId = paciente.id;
      }
    }

    // Encontrar e preencher dados do profissional
    if (profissionalId) {
      const profissional = this.profissionais.find(p => p.id === profissionalId);
      if (profissional) {
        this.agendamento.profissionalId = profissional.id;
      }
    }
  }

  onSubmit() {
    if (this.isValidTimeRange()) {
      console.log('Agendamento realizado:', this.agendamento);
      this.toastr.success('Agendamento realizado', 'Sucesso', { closeButton: true });
    } else {
      this.toastr.error('O horário de fim não pode ser menor que o de início', 'Erro', { closeButton: true });
    }
  }
  
  isValidTimeRange(): boolean {
    if (!this.agendamento.inicio || !this.agendamento.fim) {
      return false;
    }
    const inicio = this.convertToDate(this.agendamento.inicio);
    const fim = this.convertToDate(this.agendamento.fim);
    return inicio < fim;
  }

  private convertToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(1970, 0, 1, hours, minutes);
  }
}
