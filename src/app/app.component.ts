import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { MessageService } from './services/message.service';
//import * as swal from 'sweetalert';
import swal from "sweetalert2";
import { from } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formReportar: FormGroup;

  
  dependencia: string;
  correoDestinatario: string;
  recurso: string;

  url: string;

  constructor(public _MessageService: MessageService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { 
    
    this.useValidaciones();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.dependencia = params.dependencia;
      this.correoDestinatario = params.correoDestinatario;
      this.recurso = params.recurso;
      this.url = params.url;      
    });

  }

  get nombreNoValido() {
    return this.formReportar.get('nombreSolicitante').invalid && this.formReportar.get('nombreSolicitante').touched;
  }
  get emailNoValido() {
    return this.formReportar.get('emailSolicitante').invalid && this.formReportar.get('emailSolicitante').touched;
  }
  get asuntoNoValido() {
    return this.formReportar.get('asunto').invalid && this.formReportar.get('asunto').touched;
  }
  get recursoNoValido() {
    return this.formReportar.get('nombreRecurso').invalid && this.formReportar.get('nombreRecurso').touched;
  }
  get mensajeNoValido() {
    return this.formReportar.get('mensaje').invalid && this.formReportar.get('mensaje').touched;
  }

  useValidaciones() {
    this.formReportar = this.fb.group({
      nombreSolicitante: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],      
      emailSolicitante: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      asunto: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      mensaje: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
      recaptcha: ['', Validators.required],
      url: ['']
    });
  }
  
  omit_special_char(event){   
    var k;  
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 164 || k == 127 || k == 165 || (k >= 48 && k <= 57)); 
  }

  contactForm(form) {    
    this._MessageService.sendMessage(form).subscribe(() => {
      swal.fire("Mensaje enviado correctamente", 'success');
      if (form.url) {
        setTimeout(function(){ window.location.href= form.url;}, 3000);        
      } else {
        setTimeout(function(){ window.location.href='https://github.com/gus-rc/email-angular';}, 3000);
      }            
    });
  }


}
