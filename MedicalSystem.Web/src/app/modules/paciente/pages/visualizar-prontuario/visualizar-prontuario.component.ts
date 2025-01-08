import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-visualizar-prontuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent],
  templateUrl: './visualizar-prontuario.component.html',
  styleUrls: ['./visualizar-prontuario.component.css']
})
export class VisualizarProntuarioComponent {
  constructor(private sanitizer: DomSanitizer) { }

  // pdfs: any[] = []; // Lista de PDFs do paciente

  pdfs: { nome: string; }[] = [
    { nome: 'PDF 1' }, { nome: 'PDF 2' }, { nome: 'PDF 3' },
    { nome: 'PDF 4' }, { nome: 'PDF 5' }, { nome: 'PDF 6' },
    { nome: 'PDF 7' }, { nome: 'PDF 8' }, { nome: 'PDF 9' },
    { nome: 'PDF 10' }, { nome: 'PDF 11' }, { nome: 'PDF 12' },
    { nome: 'PDF 13' }, { nome: 'PDF 14' }, { nome: 'PDF 15' },
  ];

  pageSize: number = 10; // Exibir 10 PDFs por página
  currentPage: number = 1; // Página inicial


  importarPDF(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Cria um Blob a partir do arquivo PDF
      const blob = new Blob([file], { type: 'application/pdf' });
      const urlSeguro = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      const novoPDF = { nome: file.name, url: urlSeguro };
      this.pdfs.push(novoPDF);
    }
  }

  visualizarPDF(pdf: any) {
    // Abre o PDF em uma nova aba do navegador
    const url = this.sanitizer.sanitize(4, pdf.url) as string; // Converte para string segura
    if (url) {
      window.open(url, '_blank');
    }
  }

  // Método para obter os PDFs da página atual
  getPaginatedPDFs() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.pdfs.slice(startIndex, endIndex);
  }

  // Métodos para navegação entre as páginas
  nextPage() {
    if (this.currentPage * this.pageSize < this.pdfs.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
