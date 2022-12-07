import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reporte-ventas-xmetodo-pago',
  templateUrl: './reporte-ventas-xmetodo-pago.component.html',
  styleUrls: ['./reporte-ventas-xmetodo-pago.component.css']
})
export class ReporteVentasXmetodoPagoComponent implements AfterViewInit {
  formulario: FormGroup;
  makeSubmit: boolean = false;
  //Canvas para el grafico
  canvas: any;
  //Contexto del Canvas
  ctx: any;
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  //Datos para mostrar en el gráfico
  datos: any;
  //Lista de meses para filtrar el gráfico
  mesList: any;
  //fecha actual
  date = new Date();
  filtro = `Reporte de ventas del ${this.date.toLocaleDateString()}`;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService, public fb: FormBuilder) {
    this.reactiveForm();
  }
  reactiveForm() {
    this.formulario = this.fb.group({
      fechaInicial: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

  ngAfterViewInit(): void {
    this.inicioGrafico();
  }

  inicioGrafico() {
    //Obtener información del API
    this.gService
      .list('comanda/reporte/metodo')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log(this.datos);
        this.graficoBrowser();
      });
  }

  reporteFiltrado() {

    if (this.formulario.invalid) {
      return;
    }
    //Obtener información del API
    this.gService
      .create('comanda/reporte/metodo', this.formulario.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log(this.datos);
        this.graficoBrowser();
      });
    this.filtro = `Reporte de ventas de ${this.formulario.value.fechaInicial.toLocaleDateString()} hasta  ${this.formulario.value.fechaFinal.toLocaleDateString()}`;
  }

  //Configurar y crear gráfico
  graficoBrowser(): void {
    this.canvas = this.graficoCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if (this.grafico) {
      this.grafico.destroy();
    }
    this.grafico = new Chart(this.ctx, {
      type: 'bar',
      data: {
        //Etiquetas del grafico, debe ser un array
        labels: this.datos.map((x) => x.tipoPago),
        datasets: [
          {
            label: 'Cantidad de ventas',
            //Datos del grafico, debe ser un array
            data: this.datos.map((x) => x.cantidad),
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}