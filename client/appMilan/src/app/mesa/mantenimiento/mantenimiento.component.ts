import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css'],
})
export class MantenimientoComponent implements OnInit {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  sedesList: any;
  estadosList: any;
  mesaInfo: any;
  respMesa: any;
  submitted = false;
  mesaForm: FormGroup;
  idMesa: number = 0;
  isCreate: boolean = true;
  accion: string;
  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MantenimientoComponent>,
    private noti: NotificacionService
  ) 
  {
    this.formularioReactive();
    this.obtenerSedes();
    this.obtenerEstados();

  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    /* this.activeRouter.params.subscribe((params:Params)=>{*/
    /*this.idMesa=params['id'];*/
    this.idMesa = this.data.id;
    if (this.idMesa != undefined) {
      this.isCreate = false;
      this.titleForm = 'Actualizar';
      //Obtener mesa a actualizar del API
      this.gService
        .get('mesa', this.idMesa)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.mesaInfo = data;
          this.mesaForm.setValue({
            id: this.mesaInfo.id,
            capacidad: this.mesaInfo.capacidad,
            codigo: this.mesaInfo.codigo,
            idSede: this.mesaInfo.idSede,
            estado: this.mesaInfo.estado,
          });
        });
    }

    /*});*/
  }

  //Crear Videojueogo
  crearMesa(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.mesaForm.invalid) {
      return;
    }

    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .create('mesa', this.mesaForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respMesa = data;
        if (this.respMesa != null) {
          this.noti.mensaje('Mesa',
          'Mesa creada con éxito',
          TipoMessage.success);
          this.dialogRef.close(true);
        }
      });
  }
  //Actualizar Videojuego
  actualizarMesa() {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.mesaForm.invalid) {
      return;
    }

    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('mesa', this.mesaForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respMesa = data;
        if (this.respMesa != null) {
          this.noti.mensaje('Mesa',
          'Mesa actualizada con éxito',
          TipoMessage.success);
          this.dialogRef.close(true);
        }
      });
  }

  onBack() {
    this.router.navigate(['/mesas/gestion']);
  }

  public errorHandling = (control: string, error: string) => {
    return this.mesaForm.controls[control].hasError(error);
  };

  onReset() {
    this.submitted = false;
    this.mesaForm.reset();
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.mesaForm = this.fb.group({
      id: [null, null],
      codigo: [null, null],
      idSede: [null, Validators.required],
      capacidad: [
        null,
        Validators.compose([
          Validators.pattern('^[1-9]{1}[0-9]*$'),
          Validators.required,
        ]),
      ],
      estado: [true, Validators.required],
    });
  }

  obtenerSedes() {
    this.gService
      .list('sede/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sedesList = data;
      });
  }

  obtenerEstados() {
    this.gService
      .list('enum/estadosMesa')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.estadosList = data;
      });
  }

  close() {
   this.dialogRef.close();
  }
}
