import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-usuario-mantenimiento',
  templateUrl: './usuario-mantenimiento.component.html',
  styleUrls: ['./usuario-mantenimiento.component.css']
})
export class UsuarioMantenimientoComponent implements OnInit {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  sedesList: any;
  rolesList: any;
  usuarioInfo: any;
  respUsuario: any;
  submitted = false;
 usuarioForm: FormGroup;
  idUsuario: number = 0;
  isCreate: boolean = true;
  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UsuarioMantenimientoComponent>
  ) { 
    this.formularioReactive();
    this.obtenerRoles();
    this.obtenerSedes();
  }

  ngOnInit(): void {
      this.idUsuario = this.data.id;
      if (this.idUsuario != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener mesa a actualizar del API
        this.gService
          .get('usuario', this.idUsuario)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.usuarioInfo = data;
            this.usuarioForm.setValue({
              id: this.usuarioInfo.id,
              nombre: this.usuarioInfo.nombre,
              apellido1: this.usuarioInfo.apellido1,
              apellido2: this.usuarioInfo.apellido2,
              telefono: this.usuarioInfo.telefono,
              rol: this.usuarioInfo.rol,
              idSede: this.usuarioInfo.idSede,
            });
          });
      }
  }

  obtenerSedes() {
    this.gService
      .list('sede/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.sedesList = data;
      });
  }

  obtenerRoles() {
    this.gService
      .list('enum/roles')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.rolesList = data;
      });
  }

//Crear Videojueogo
crearUsuario(): void {
  //Establecer submit verdadero
  this.submitted = true;
  //Verificar validación
  if (this.usuarioForm.invalid) {
    return;
  }

  //Obtener id Generos del Formulario y Crear arreglo con {id: value}
  /*let gFormat:any=this.usuarioForm.get('generos').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.videojuegoForm.patchValue({ generos:gFormat});*/
  /* console.log(this.videojuegoForm.value);*/
  //Accion API create enviando toda la informacion del formulario
  this.gService
    .create('usuario', this.usuarioForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      //Obtener respuesta
      this.respUsuario = data;
      /*  this.router.navigate(['/mesas/gestion'],{
        queryParams: {create:'true'}
      });*/
    });

  /*this.noti.mensaje('Mesa',
  'Mesa creada con éxito',
  TipoMessage.success);*/
}
//Actualizar Videojuego
actualizarUsuario() {
  //Establecer submit verdadero
  this.submitted = true;
  //Verificar validación
  if (this.usuarioForm.invalid) {
    return;
  }

   //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    //let gFormat:any=this.videojuegoForm.get('generos').value.map(x=>({['id']: x }));
    //Asignar valor al formulario
    /* this.usuarioForm.patchValue({ generos:gFormat});*/
    console.log(this.usuarioForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('usuario', this.usuarioForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respUsuario = data;
        /*this.router.navigate(['/mesas/gestion'],{
          queryParams: {update:'true'}
        });*/
      });
  }


  close() {
    this.dialogRef.close({data :'Cancel'});
  }
  

  //Crear Formulario
  formularioReactive() {
   // [null, Validators.required]
    this.usuarioForm = this.fb.group({
      id: [
        null,
        Validators.compose([
          Validators.pattern('^[1-9]{1}0[0-9]{7}$'),
          Validators.required,
        ]),
      ],
      nombre: [
        null,
        Validators.compose([
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.required,
        ]),
      ],
      apellido1: [null, Validators.compose([
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.required,
      ]),
    ],
    apellido2: [null, Validators.compose([
      Validators.pattern('^[a-zA-Z]+$'),
      Validators.required,
    ]),
  ],
      telefono:  [null, Validators.compose([
        Validators.pattern('^[0-9]+$'),
        Validators.required,
      ]),
    ],
      rol: [null, Validators.required],
      idSede: [null, Validators.required],
   
    });
  }

  /*public errorHandling = (control: string, error: string) => {
    return this.usuarioForm.controls[control].hasError(error);
  };
*/
  onReset() {
    this.submitted = false;
    this.usuarioForm.reset();
  }

}

