import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalleMesaComponent } from '../detalle-mesa/detalle-mesa.component';
import { MantenimientoComponent } from '../mantenimiento/mantenimiento.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogoConfirmacionComponent } from 'src/app/share/dialogo-confirmacion/dialogo-confirmacion.component';
import { ComandaEnacabezadoComponent } from 'src/app/comanda/comanda-enacabezado/comanda-enacabezado.component';
import { AuthenticationService } from 'src/app/share/authentication.service';
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css'],
})
export class GestionComponent implements OnInit {
  sedesForm: FormGroup;
  sedesList: any;
  mesasList: any;
  usuario: any;
  datos: any;
  //isCancelable: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  currentUser: any;
  isAutenticated: boolean;
  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
  ) {
    this.obtenerUsuario();
    this.formularioReactice();
    this.obtenerSedes();
    console.log(this.usuario)
  }

  ngOnInit(): void {


    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.sedesForm;
  
  }

  onChange() {
    let idSede = this.sedesForm.get('sede').value;
    this.obtenerMesasSede(idSede);
  }

  formularioReactice() {
    this.sedesForm = this.fb.group({
      sede: null,
    });
  }

  obtenerUsuario() {
    this.gService
    .get('usuario', '2081000072') /*mesero*/
      //.get('usuario', '208100007') /*admin */
      //.get('usuario', '208109907') /*cliente */
      //.get('usuario', '304570878') /*cliente */
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.usuario = data;
 if (this.usuario.rol == 'mesero') { //Mesas para la sede a la que pertenece
          this.obtenerMesasSede(this.usuario.idSede);
             }
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
        if (this.usuario.rol != 'administrador') {
          this.mesasList = data.filter(mesa => mesa.estado != 'inactiva');
        } else {
          this.mesasList = data;
        }
      });
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
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog output:', result);
    });
  }

  actualizarMesa(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.data = {
      id,
    };
    this.dialog.open(MantenimientoComponent, dialogConfig);
  }

  reservarMesa(codigo: number, id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '40%';
    dialogConfig.data = `¿Desea reservar la mesa ${codigo}?`;
    this.dialog
      .open(DialogoConfirmacionComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          let respMesa, respComanda, newComanda;

          this.gService
            .get('mesa', id) //Obtiene mesa
            .pipe(takeUntil(this.destroy$))
            .subscribe((mesa: any) => {
              mesa.estado = 'reservada';

              this.gService
                .update('mesa', mesa) //actualiza mesa
                .pipe(takeUntil(this.destroy$))
                .subscribe((data: any) => {
                  //Obtener respuesta
                  respMesa = data;

                  newComanda = {
                    idMesa: id,
                    idUsuario: this.currentUser.user.id,
                  };
                  this.gService //Crear comanda
                    .create('comanda', newComanda)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((data: any) => {
                      //Obtener respuesta
                      respComanda = data;
                    });
                });
            });
        }
      });
  }

  /*isReservaCancelable(idMesa: any) {
    this.gService
    .get('comanda/last', idMesa)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
    if (data.usuario.id === this.usuario.id) {
this.isCancelable = true;
    } else {
      this.isCancelable = false;
    }
    });
  }*/
  verComanda(idMesa: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '95%';
    dialogConfig.data = {
      idMesa,
    };
    
    this.dialog.open(ComandaEnacabezadoComponent, dialogConfig);
  }

}
