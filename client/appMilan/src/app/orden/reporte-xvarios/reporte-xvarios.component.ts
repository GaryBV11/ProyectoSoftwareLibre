import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reporte-xvarios',
  templateUrl: './reporte-xvarios.component.html',
  styleUrls: ['./reporte-xvarios.component.css'],
})
export class ReporteXvariosComponent implements OnInit {
  datos: any;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  formulario: FormGroup;
  titulo: any;
  currentUser: any;
  isAutenticated: boolean;
  constructor(
    private gService: GenericService,
    public fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    //Subscripción al booleano que indica si esta autenticado
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
    this.titulo = `Reporte de ventas`;
    console.log(this.currentUser.user.id);
    this.formulario.controls['id'].setValue(this.currentUser.user.id);
    this.formulario.controls['rol'].setValue(this.currentUser.user.rol);
  }

  reporteFiltrado() {
    if (this.formulario.invalid) {
      return;
    }
    let datos = {
      fechaInicial: new Date(this.formulario.value.fechaFinal),
      fechaFinal: new Date(this.formulario.value.fechaFinal),
      filtro: this.formulario.value.filtro,
      usuario: this.currentUser.user,
    };
    this.gService
      .create('comanda/reporte/varios', this.formulario.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
    this.titulo = `Reporte de ventas de ${this.formulario.value.fechaInicial.toLocaleDateString()} hasta  ${this.formulario.value.fechaFinal.toLocaleDateString()}`;
  }

  reactiveForm() {
    /*https://angular.io/guide/reactive-forms
 https://angular.io/api/forms/Validators */

    this.formulario = this.fb.group({
      id: ['', null],
      rol: ['', null],
      filtro: ['', [Validators.required]],
      fechaInicial: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
    });
  }

  onReset() {
    this.formulario.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

  openPDF() {
    //htmlData: id del elemento HTML
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      //Configuración del ancho y alto del Canvas de la imagen
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //devuelve un data URI,el cual contiene una representación
      // de la imagen en el formato especificado por el parámetro type
      const FILEURI = canvas.toDataURL('image/png');
      //Orientación, unidad, formato
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      //Agregar imagen al PDF
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reporte.pdf');
    });
  }
}
