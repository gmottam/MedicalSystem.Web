import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario, Cargo } from '../../models/usuario.model';  // Importando o enum Cargo

declare var bootstrap: any;

@Component({
  selector: 'app-consultar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent, FormsModule],
  templateUrl: './consultar-usuario.component.html',
  styleUrl: './consultar-usuario.component.css'
})
export class ConsultarUsuarioComponent implements AfterViewInit, OnInit {

  filtroNome: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  usuarios: Usuario[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioService.obterUsuarios().subscribe({
      next: (response: Usuario[]) => {
        this.usuarios = response;
        console.log(response)
      },
      error: (error: any) => {
        console.error('Erro ao buscar usuarios:', error)
      },
      complete: () => {
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

  usuariosFiltrados() {
    return this.usuarios.filter(usuario => usuario.nome.toLowerCase().includes(this.filtroNome.toLowerCase()));
  }

  usuariosPaginaAtual() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.usuariosFiltrados().slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.usuariosFiltrados().length) {
      this.currentPage++;
    }
  }

  excluirUsuario(usuario: Usuario, event: Event): void {
    const confirmDelete = confirm(`Você tem certeza que deseja excluir o usuario ${usuario.nome}?`);
    if (confirmDelete) {
      this.usuarios = this.usuarios.filter(p => p !== usuario);
      console.log('usuario excluído:', usuario);
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

  // Método para obter a descrição legível do cargo
  getCargoDescricao(cargo: Cargo): string {
    return Cargo[cargo]; // Retorna o nome legível do cargo (ex: "Usuario" ou "Admin")
  }
}
