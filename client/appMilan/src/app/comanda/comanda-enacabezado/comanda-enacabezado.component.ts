import { Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ComandaDetalleComponent } from '../../comanda-detalle/comanda-detalle.component';

@Component({
  selector: 'app-comanda-enacabezado',
  templateUrl: './comanda-enacabezado.component.html',
  styleUrls: ['./comanda-enacabezado.component.css']
})
export class ComandaEnacabezadoComponent implements OnInit {
  datos: any;
  datosUser:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gSevice: GenericService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.listaComandas();
   
  }


  listaComandas(){
    this.gSevice
        .list('comanda/')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
        });
  }

  comandaDetalle(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(ComandaDetalleComponent,dialogConfig);
  }

}
