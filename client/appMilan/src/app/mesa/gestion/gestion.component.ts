import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalleMesaComponent } from '../detalle-mesa/detalle-mesa.component';


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})


export class GestionComponent implements OnInit {
  sedesForm: FormGroup;
  sedesList: any;
  mesasList : any;
  datos:any;
  destroy$:Subject<boolean>= new Subject<boolean>();


  constructor( private fb: FormBuilder, private gService:GenericService, private dialog:MatDialog) {
    this.formularioReactice();
    this.obtenerSedes();
   }

  ngOnInit(): void {
   this.sedesForm
  }

formularioReactice(){
this.sedesForm = this.fb.group({
  sede: null
});
}

  obtenerSedes(){
    this.sedesList = null;
    this.gService
    .list('sede/',)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.sedesList=data; 
    });
}

obtenerMesasSede(id:any) {
  this.gService
  .get('mesa/sede',id)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data:any)=>{
     this.mesasList = data;
  });
}

onChange() {
let idSede = this.sedesForm.get('sede').value;
this.obtenerMesasSede(idSede);
}


detalleMesa(id:number){
  const dialogConfig=new MatDialogConfig();
  dialogConfig.disableClose=false;
  dialogConfig.data={
    id:id
  };
  this.dialog.open(DetalleMesaComponent,dialogConfig);
}

}
