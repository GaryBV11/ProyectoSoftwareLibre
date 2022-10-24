import { Component, OnInit,ViewChild  } from '@angular/core';
import { AfterViewInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  dataSourcee= new MatTableDataSource<any>();  
  // Columnas
  displayedColumns = ['id', 'nombre','apellido1','apellido2','telefono','idSede','rol'];


  constructor(private router: Router,
    private route: ActivatedRoute,private gService:GenericService) { }

  ngOnInit(): void {
    this.listaUsuario();
    }

  listaUsuario(){
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSourcee= new MatTableDataSource(this.datos);
        this.dataSourcee.sort = this.sort;
        this.dataSourcee.paginator = this.paginator;
        
      });
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
