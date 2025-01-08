import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { ProfissionalService } from './../../services/profissional.service';
import { Profissional } from '../../models/profissional.model';

declare var bootstrap: any;

@Component({
  selector: 'app-consultar-profissional',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent, FormsModule],
  templateUrl: './consultar-profissional.component.html',
  styleUrls: ['./consultar-profissional.component.css']
})

export class ConsultarProfissionalComponent implements OnInit {

  filtroNome: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  profissionais: Profissional[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private profissionalService: ProfissionalService
  ) { }

  ngOnInit(): void {
    this.profissionalService.obterProfissionais().subscribe({
      next: (response: Profissional[]) => {
        this.profissionais = response;
        console.log(response)
      },
      error: (error: any) => {
        console.error('Erro ao buscar profissionais:', error)
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

  profissionaisFiltrados() {
    return this.profissionais.filter(profissional => profissional.nome.toLowerCase().includes(this.filtroNome.toLowerCase()));
  }

  profissionaisPaginaAtual() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.profissionaisFiltrados().slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.profissionaisFiltrados().length) {
      this.currentPage++;
    }
  }

  excluirProfissional(profissional: Profissional, event: Event): void {
    const confirmDelete = confirm(`Você tem certeza que deseja excluir o profissional ${profissional.nome}?`);
    if (confirmDelete) {
      this.profissionais = this.profissionais.filter(p => p !== profissional);
      console.log('profissional excluído:', profissional);
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