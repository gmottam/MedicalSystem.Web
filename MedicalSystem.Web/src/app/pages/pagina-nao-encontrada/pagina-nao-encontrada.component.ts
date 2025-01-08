import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada',
  standalone: true,
  imports: [],
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrl: './pagina-nao-encontrada.component.css'
})
export class PaginaNaoEncontradaComponent {

  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/home']);
  }
}
