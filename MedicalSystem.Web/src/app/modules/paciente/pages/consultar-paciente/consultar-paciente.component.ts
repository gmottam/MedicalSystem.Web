import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';

declare var bootstrap: any;

@Component({
  selector: 'app-consultar-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent, FormsModule],
  templateUrl: './consultar-paciente.component.html',
  styleUrls: ['./consultar-paciente.component.css']
})

export class ConsultarPacienteComponent implements OnInit, AfterViewInit {

  filtroNome: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  pacientes: Paciente[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.pacienteService.obterPacientes().subscribe({
      next: (response: Paciente[]) => {
        this.pacientes = response;
        console.log(response)
      },
      error: (error: any) => {
        console.error('Erro ao buscar pacientes:', error)
      },
      complete: () =>{
        console.log('Requisição completada');
      }
    })
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map((tooltipTriggerEl: any) => new bootstrap.Tooltip(tooltipTriggerEl));
    }
  }

  pacientesFiltrados() {
    return this.pacientes.filter(paciente => paciente.nome.toLowerCase().includes(this.filtroNome.toLowerCase()));
  }

  pacientesPaginaAtual() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.pacientesFiltrados().slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.pacientesFiltrados().length) {
      this.currentPage++;
    }
  }

  excluirPaciente(paciente: Paciente, event: Event): void {
    const confirmDelete = confirm(`Você tem certeza que deseja excluir o paciente ${paciente.nome}?`);
    if (confirmDelete) {
      this.pacientes = this.pacientes.filter(p => p !== paciente);
      console.log('Paciente excluído:', paciente);
      this.hideTooltip(event);
    }
  }

  hideTooltip(event?: Event): void {
    if (event) {
      const tooltipElement = event.currentTarget as HTMLElement;
      const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipElement);
      tooltipInstance?.hide();
    }
  }
}