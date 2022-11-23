import { Component, OnInit,ViewChild  } from '@angular/core';
import { AfterViewInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioMantenimientoComponent } from '../usuario-mantenimiento/usuario-mantenimiento.component';
@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrls: ['./usuario-index.component.css']
})
export class UsuarioIndexComponent implements OnInit {
  datos:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource= new MatTableDataSource<any>();  
  // Columnas
  displayedColumns = ['id', 'nombre','apellido1','apellido2','telefono','sede','rol','acciones'];


  constructor(private router: Router,
    private route: ActivatedRoute,private gService:GenericService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listaUsuario();
    }

  listaUsuario(){
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      });
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  crearUsuario() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '80%';
    const dialogRef = this.dialog.open(UsuarioMantenimientoComponent, dialogConfig);
  /*  dialogRef.afterClosed().subscribe(
      result => {console.log("Dialog output:",result);});    */
  }

  actualizarUsuario(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '80%';
    dialogConfig.data = {
      id,
    };
    const dialogRef = this.dialog.open(UsuarioMantenimientoComponent, dialogConfig);
  }

}
