import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast-alert',
  standalone: true,
  imports: [],
  templateUrl: './toast-alert.component.html',
  styleUrl: './toast-alert.component.css'
})
export class ToastAlertComponent {
  constructor(private toastr: ToastrService){

  }

  showSuccess(){
    this.toastr.success('Sucesso!', 'Success', {closeButton:true})
  }
}
