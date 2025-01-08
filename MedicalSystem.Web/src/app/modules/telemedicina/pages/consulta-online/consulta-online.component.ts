import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta-online',
  standalone: true,
  imports: [ SidebarComponent, FormsModule, CommonModule ],
  templateUrl: './consulta-online.component.html',
  styleUrls: ['./consulta-online.component.css']
})
export class ConsultaOnlineComponent {
  messages: { sender: string, text: string }[] = []; 
  newMessage: string = ''; 
  consultaNotes: string = ''; 

  constructor() { }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'Você', text: this.newMessage });
      this.newMessage = '';
    }
  }

  saveNotes() {
    console.log('Anotações salvas:', this.consultaNotes);
  }
}
