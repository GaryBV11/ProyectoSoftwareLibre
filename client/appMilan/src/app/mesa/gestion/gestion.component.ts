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
  
    this.formularioReactice();
    this.obtenerSedes();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    if(this.currentUser.user.rol==='mesero'){
      this.obtenerMesasSede(this.currentUser.user.idSede)
    }
    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
    console.log(this.currentUser.user.idSede)
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
        if (this.currentUser.user.rol != 'administrador') {
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
    this.dialog.open(MantenimientoComponent, dialogConfig).afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.ngOnInit();
        window.location.reload();
      }

    });
    this.ngOnInit();
    window.location.reload();
  }

  actualizarMesa(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.data = {
      id,
    };
    this.dialog.open(MantenimientoComponent, dialogConfig).afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.ngOnInit();
      };
    });
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
                    estado:"registrado",
                    subTotal:0,
                    impuesto:0,
                    total:0
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
