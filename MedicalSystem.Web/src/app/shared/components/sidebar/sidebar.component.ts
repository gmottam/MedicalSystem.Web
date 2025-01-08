import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  hideTooltip(event?: Event): void {
    if (event) {
      const tooltipElement = event.currentTarget as HTMLElement;
      const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipElement);
      tooltipInstance?.hide();
    }
  }
}
