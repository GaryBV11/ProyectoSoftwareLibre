import { Component, Inject, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoComponent } from 'src/app/producto/ventasProductos/producto/producto.component';
@Component({
  selector: 'app-comanda-enacabezado',
  templateUrl: './comanda-enacabezado.component.html',
  styleUrls: ['./comanda-enacabezado.component.css']
})
export class ComandaEnacabezadoComponent implements OnInit {
  titleForm: string = 'Comanda';
  destroy$: Subject<boolean> = new Subject<boolean>();
  detallesList:any;
  datos: any;
  datosUser:any;
  encabezadoInfo:any;
  public idComandaMesa:number=0;
  comandaForm: FormGroup;
  isCreate:boolean=true;
  subtotal:number=0;
  iv:number=0;
  Total:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource= new MatTableDataSource<any>();
  // Columnas
  displayedColumns = ['descripcion', 'categoria','cantidad','precio','acciones'];

  constructor(private gService: GenericService,
    private fb: FormBuilder,private router: Router,
    private activeRouter: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ComandaEnacabezadoComponent>,
    private route: ActivatedRoute,
  ) {
    this.idComandaMesa=data.idMesa;
    
  }
  ngOnInit(): void {
    this.listaComandas(this.idComandaMesa);
    console.log(this.data)
    this.subtotal=0;
  }


  listaComandas(id:any){
    this.gService
        .get('comanda/last',id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
        this.obtenerDetalles(this.datos[0].id);
          console.log(this.datos);
        });
  }

  obtenerDetalles(idComanda:any){
    this.gService
    .get('comanda/detalles',idComanda)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.detallesList=data;
      this.dataSource= new MatTableDataSource(this.detallesList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.detallesList);
      this.calcularTotales();
  });
}
  

traerProductos(idComandaMesa:number){
  this.router.navigate(['/productos/ventas', idComandaMesa], {
    relativeTo: this.route,
  });
  this.dialogRef.close();
}
  
 calcularTotales(){ 
  for(let i=0;i<this.detallesList.length;i++){
    this.subtotal=this.subtotal+parseFloat(this.detallesList[i].producto.precio)*parseInt((this.detallesList[i].cantidad));
    this.iv=this.subtotal*0.13;
    this.Total=this.subtotal+this.iv;
  }
 
 }
 borrarDetalle(idComanda:any,idProducto:any){
  let detalle={idComanda,idProducto}
  this.gService
    .create('comanda/detalles/delete',detalle)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.ngOnInit();
      
  });
 }

}
