import { Component, Inject, OnInit ,ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-comanda-nota',
  templateUrl: './comanda-nota.component.html',
  styleUrls: ['./comanda-nota.component.css']
})
export class ComandaNotaComponent implements OnInit {
 idcomanda:any;
 notaVieja:any;
 destroy$: Subject<boolean> = new Subject<boolean>();
 formulario: FormGroup;
 
  submitted = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<ComandaNotaComponent>,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.idcomanda = data.idcomanda;
  
   }

  ngOnInit(): void {
    
    this.reactiveForm();
    this.buscarnotaVieja();
  
  }
  buscarnotaVieja(){
    this.gService
        .get('comanda/',this.idcomanda)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
        this.notaVieja=data.nota;
        if(this.notaVieja!=null){
          this.setearFormulario(this.notaVieja);
        }else{
          this.setearFormulario("Sin notas");
        }
        
        console.log(this.notaVieja+"nota vieja")
        });
  }
  agregarNota(){
   let notas={id:this.formulario.value.id,nota:this.formulario.value.nota}
    this.gService
      .create('comanda/nota',notas)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.dialogRef.close();
        
    });
  }
  setearFormulario(nota:any){
    this.formulario.setValue({
      id:this.idcomanda,
      nota:nota,

    })
  }

reactiveForm() {
  /*https://angular.io/guide/reactive-forms
 https://angular.io/api/forms/Validators */
  this.formulario = this.fb.group({
    id: ['', Validators.required],
    nota: ['', Validators.required],
  });


}

public errorHandling = (control: string, error: string) => {
  return this.formulario.controls[control].hasError(error);
};

onReset() {
  this.submitted = false;
  this.formulario.reset();
}


}