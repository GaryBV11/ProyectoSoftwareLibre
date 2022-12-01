import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { UsuarioMantenimientoComponent } from '../usuario-mantenimiento/usuario-mantenimiento.component';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {
  hide=true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { 
    this.reactiveForm();
  }

  mensajes() {
    let register = false;
    let auth=false;
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params['register']==='true' || false;
      auth = params['auth']==='no' || false;
      if (register) {
        this.notificacion.mensaje(
          'Usuario',
          'Registro satisfactorio! Especifique su credenciales para ingresar',
          TipoMessage.success
        );
      }
      if (auth) {
        this.notificacion.mensaje(
          'Usuario',
          'Acceso denegado',
          TipoMessage.warning
        );
      }
    });
  }

   // Definir el formulario con su reglas de validación
   reactiveForm() {
    /*https://angular.io/guide/reactive-forms
   https://angular.io/api/forms/Validators */
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mensajes();
  }


  onReset() {
    this.formulario.reset();
  }

  submitForm() {
    this.makeSubmit=true;
    //Validación
    if(this.formulario.invalid){
     return;
    }
    this.authService
    .loginUser(this.formulario.value)
    .subscribe((respuesta:any)=>{
 
     //Redireccionar al loguearse
     this.router.navigate(['/']);
    });
   }


   crearUsuario() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '80%';
    dialogConfig.height = '85%';
    const dialogRef = this.dialog.open(UsuarioMantenimientoComponent, dialogConfig);
  /*  dialogRef.afterClosed().subscribe(
      result => {console.log("Dialog output:",result);});    */
  }

   /* Manejar errores de formulario en Angular */

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
