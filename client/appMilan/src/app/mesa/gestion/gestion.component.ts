import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalleMesaComponent } from '../detalle-mesa/detalle-mesa.component';
import { MantenimientoComponent } from '../mantenimiento/mantenimiento.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css'],
})
export class GestionComponent implements OnInit {
  sedesForm: FormGroup;
  sedesList: any;
  mesasList: any;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioReactice();
    this.obtenerSedes();
  }

  ngOnInit(): void {
    this.sedesForm;
  }

  formularioReactice() {
    this.sedesForm = this.fb.group({
      sede: null,
    });
  }

  obtenerSedes() {
    this.sedesList = null;
    this.gService
      .list('sede/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sedesList = data;
      });
  }

  obtenerMesasSede(id: any) {
    this.gService
      .get('mesa/sede', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.mesasList = data;
      });
  }

  onChange() {
    let idSede = this.sedesForm.get('sede').value;
    this.obtenerMesasSede(idSede);
  }

  detalleMesa(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '40%';
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(DetalleMesaComponent, dialogConfig);
  }

  crearMesa() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    const dialogRef = this.dialog.open(MantenimientoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {console.log("Dialog output:",result);});    
  }

  actualizarMesa(id: number) {
    /* this.router.navigate(['/mesas/update', id], {
      relativeTo: this.route,
    });*/
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.data = {
      id,
    };
    this.dialog.open(MantenimientoComponent, dialogConfig);
  }
}
