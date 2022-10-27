import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-comanda-detalle',
  templateUrl: './comanda-detalle.component.html',
  styleUrls: ['./comanda-detalle.component.css']
})
export class ComandaDetalleComponent implements OnInit {
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  constructor( @Inject(MAT_DIALOG_DATA) data,
  private dialogRef:MatDialogRef<ComandaDetalleComponent>,
  private gService:GenericService) { 
    this.datosDialog=data;
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerComanda(this.datosDialog.id);
    }
  }


  obtenerComanda(id:any){
    this.gService
    .get('comanda/detalles',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.datos=data;
  });

  };
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}
