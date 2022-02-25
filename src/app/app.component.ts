import { Component } from '@angular/core';
import { MessageService } from './services/message.service';
//import * as swal from 'sweetalert';
import swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public _MessageService: MessageService) {

  }
  contactForm(form) {
    this._MessageService.sendMessage(form).subscribe(() => {
      //swal("Formulario de contacto", "Mensaje enviado correctamente", 'success');
      swal.fire("Reporte generado", "Mensaje enviado correctamente", 'success');
    });
  }
}
