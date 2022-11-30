import { Component, OnInit,Inject } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ComandaEnacabezadoComponent } from 'src/app/comanda/comanda-enacabezado/comanda-enacabezado.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  sedesForm: FormGroup;
  sedesList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  productosList:any ;
  idMesaa:number;
  constructor(private gService: GenericService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,) { 
      this. formularioReactice();
      this.obtenerSedes();
     
      
    }

  ngOnInit(): void {
   
    this.sedesForm;
  }


  obtenerSedes() {
    this.sedesList = null;
    this.gService
      .list('sede/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.sedesList = data;
      });
  }

  listaProductos(idSede:any){
    this.gService
        .get('producto/sedes',idSede)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any) => {
          console.log(data);
          this.productosList = data.productos;
        });
  }
  onChanges() {
    let idSede = this.sedesForm.get('sede').value;
    this.listaProductos(idSede);
  }
  
  formularioReactice() {
    this.sedesForm = this.fb.group({
      sede: null,
    });
  }
   
  
  
}
