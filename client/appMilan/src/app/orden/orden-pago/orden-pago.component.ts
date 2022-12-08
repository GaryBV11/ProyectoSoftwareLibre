import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-orden-pago',
  templateUrl: './orden-pago.component.html',
  styleUrls: ['./orden-pago.component.css'],
})
export class OrdenPagoComponent implements OnInit {
  formulario: FormGroup;
  makeSubmit: boolean = false;
  efectivo = false;
  tarjeta = false;
  subTotal: any;
  iva: any;
  cambio: any;
  total: any;
  datosDialog: any;
  currentUser: any;
  isAutenticated: boolean;
  detallesCarrito:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<OrdenPagoComponent>,
    private notificacion: NotificacionService,
    private authService: AuthenticationService,
    private gService: GenericService,
    private cartService: CartService
  ) {
    this.datosDialog = data;
    this.calcularMontos();
    this.reactiveForm();
    this.valuesChange();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    this.cartService.currentDataCart$.subscribe(data=>{
      this.detallesCarrito=data;
     })


  }

  calcularMontos() {
    this.subTotal = parseFloat(this.datosDialog.total);
    this.iva = parseFloat(this.datosDialog.total) * 0.13;
    this.total = parseFloat(this.subTotal) + parseFloat(this.iva);
  }

  calcularVuelto() {
    //input monto cambia
    if (Number.isNaN(parseFloat(this.formulario.value.montoEfectivo))) {
      // si digita letras
      return 0;
    } else {
      if (
        parseFloat(this.formulario.value.montoEfectivo) > parseFloat(this.total)
      ) {
        // si el monto es mayor al total
        return (
          parseFloat(this.formulario.value.montoEfectivo) -
          parseFloat(this.total)
        );
      } else {
        return 0;
      }
    }
  }

  //metodo calcular monto restante
  valuesChange() {
    //monto en efectivo
     this.formulario
      .get('montoEfectivo')
      ?.valueChanges.subscribe((valor: string) => {
        if (this.tarjeta && this.efectivo) {
          if (!Number.isNaN(parseFloat(valor))) {
            // si digita letras
            if (parseFloat(valor) >= parseFloat(this.total)) {
              //Cambia monto a 0 si es mayor, para no dar negativos
              this.formulario.controls['montoTarjeta'].setValue('0');
            } else {
              this.formulario.controls['montoTarjeta'].setValue(
                parseFloat(this.total) - parseFloat(valor)
              );
            }
          } else {
            this.formulario.controls['montoTarjeta'].setValue('0');
          }
        }
      });

    //monto en tarjeta
    this.formulario
      .get('montoTarjeta')
      ?.valueChanges.subscribe((valor: string) => {
        if (this.tarjeta && this.efectivo) {
          if (!Number.isNaN(parseFloat(valor))) {
            // si digita letras
            if (parseFloat(valor) >= parseFloat(this.total)) {
              this.formulario.controls['montoTarjeta'].setValue('0'); //Cambia monto a 0 si es mayor, para no dar negativos
            } else {
              this.formulario.controls['montoEfectivo'].setValue(
                parseFloat(this.total) - parseFloat(valor)
              );
            }
          } else {
            this.formulario.controls['montoEfectivo'].setValue('0');
          }
        }
      }); 

      }

  reactiveForm() {
      this.formulario = this.fb.group({
        montoEfectivo: [
          '',
          null
        ],
        montoTarjeta: [
          '',
          null
        ],
        numero: [
          '',
          null
        ],
      });
  }

  onReset() {
    this.formulario.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

  procesarPago() {

    //Validaciones xD
//Metodo de pago no seleccionado
    if (!this.efectivo && !this.tarjeta) {
      this.notificacion.mensaje(
        'Error',
        'Por favor seleccione un metodo de pago',
        TipoMessage.error
      );
      return;
    }
    
    let regMonto = new RegExp('^[1-9]{1}[0-9]*$');
    //validaciones en efectivo
if (this.efectivo) {
//monto vacio
  if (this.formulario.controls['montoEfectivo'].value == '') {
    this.notificacion.mensaje(
      'Error',
      'Por favor ingrese un monto en efectivo',
      TipoMessage.error
    );
    return;
  }
//monto en 0
  if (this.formulario.controls['montoEfectivo'].value == '0') {
    this.notificacion.mensaje(
      'Error',
      'El monto en efectivo no puede ser 0',
      TipoMessage.error
    );
    return;
  }

  //reg monto
  if (!regMonto.test(this.formulario.controls['montoEfectivo'].value)) {
    this.notificacion.mensaje(
      'Error',
      'Monto en efectivo inválido',
      TipoMessage.error
    );
    return;
  }
}
  
if (this.tarjeta) {
  let regTarjeta = new RegExp('^[1-9]{1}[0-9]{15}$');

   //numero tarjeta vacio
   if (this.formulario.controls['numero'].value == '') {
    this.notificacion.mensaje(
      'Error',
      'Por favor ingrese un número de tarjeta',
      TipoMessage.error
    );
    return;
  }

     //reg tarjeta
     if (!regTarjeta.test(this.formulario.controls['numero'].value)) {
      this.notificacion.mensaje(
        'Error',
        'Número de tarjeta inválido',
        TipoMessage.error
      );
      return;
    }

//monto vacio
  if (this.formulario.controls['montoTarjeta'].value == '') {
    this.notificacion.mensaje(
      'Error',
      'Por favor ingrese un monto en tarjeta',
      TipoMessage.error
    );
    return;
  }

 
//monto en 0
  if (this.formulario.controls['montoTarjeta'].value == '0') {
    this.notificacion.mensaje(
      'Error',
      'El monto de tarjeta no puede ser 0',
      TipoMessage.error
    );
    return;
  }

  //reg monto
  if (!regMonto.test(this.formulario.controls['montoTarjeta'].value)) {
    this.notificacion.mensaje(
      'Error',
      'Monto de tarjeta inválido',
      TipoMessage.error
    );
    return;
  }


}


    //validar montos
    if (parseFloat(this.formulario.value.montoEfectivo) + parseFloat(this.formulario.value.montoTarjeta) < parseFloat(this.datosDialog.total)) {
      this.notificacion.mensaje(
        'Error',
        'Monto insuficiente',
        TipoMessage.error
      );
      return;
    }

    if ( parseFloat(this.formulario.value.montoEfectivo) + parseFloat(this.formulario.value.montoTarjeta) > parseFloat(this.total)) {
      this.notificacion.mensaje(
        'Error',
        'Monto sobrepasa el coste',
        TipoMessage.error
      );
      return;
    }
    /*------------------------------------------------------------------------ */
    //Carrito
    if (this.datosDialog.idComanda == null) {
      this.comandaCarrito();
    } else {
      this.crearDetallesPago(this.datosDialog.idComanda);
    }
    if (this.datosDialog.idComanda == null) {
      
      this.notificacion.mensaje(
        'Pago',
        'Pago realizado con éxito',
        TipoMessage.success
      );
      this.dialogRef.close(true);
      /*------------------------------------------------------------------------ */
    } else {
      //comanda en sede
      this.gService // Obtener comanda
        .get('comanda', this.datosDialog.idComanda)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          let newComanda = {
            id: data.id,
            estado: 'entregada',
            nota: data.nota,
            subTotal: parseFloat(this.datosDialog.total),
            impuesto: parseFloat(this.datosDialog.total) * 0.13,
            total: parseFloat(this.subTotal) + parseFloat(this.iva),
            idMesa: data.idMesa,
            direccion: data.direccion,
          };
          this.gService //actualizar comanda
            .update('comanda', newComanda)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
              if (data != null) {
                //si fue exitoso
                this.gService //obtener mesa
                  .get('mesa', newComanda.idMesa)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe((data: any) => {
                    let newMesa = { //crea mesa actualizada
                      id:data.id,
                      codigo : data.codigo,
                      estado:'libre',
                      capacidad:data.capacidad,
                      idSede: data.idSede
                    };
                    this.gService //actualizar mesa
                      .update('mesa', newMesa)
                      .pipe(takeUntil(this.destroy$))
                      .subscribe((data: any) => {
                        if (data != null) {
                          this.notificacion.mensaje(
                            'Pago',
                            'Pago realizado con éxito',
                            TipoMessage.success
                          );
                        }
                        this.dialogRef.close(true);
                      });
                  });
              }
            });
        });
    }
  }

  comandaCarrito() {
    //Crea una comanda que representa el carrito
    let newComanda = {
      idUsuario: this.currentUser.user.id,
      estado: 'entregada',
      subTotal: parseFloat(this.datosDialog.total),
      impuesto: parseFloat(this.datosDialog.total) * 0.13,
      total: parseFloat(this.subTotal) + parseFloat(this.iva),
    };
    this.gService //Crear comanda
      .create('comanda', newComanda)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtiene comanda creada y se asigna a una variable
        this.crearDetallesComanda(data);
        this.crearDetallesPago(data.id);
      });
  }

  crearDetallesComanda(comandaCreada) {
    //Crea los detalles de los productos del carrito
    let respDetalle;
    this.cartService.currentDataCart$.subscribe(data=>{
     data.forEach((item) => {
        let newDetalle = {
          cantidad: item.cantidad,
          idProducto: item.idItem,
          idComanda: comandaCreada.id,
        
        };
        this.gService
        .create('comanda/detalles/create', newDetalle)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          respDetalle = data;
        });
     });
    
      //añadir detalles
      
    });
  }

  crearDetallesPago(idComanda) {
    let newPago, respMesa;
    if (this.efectivo) {
      newPago = {
        tipoPago: 'efectivo',
        monto: this.formulario.value.montoEfectivo,
        idComanda: idComanda,
      };
      this.gService
        .create('comanda/pago', newPago)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          respMesa = data;
        });
    }
    if (this.tarjeta) {
      newPago = {
        tipoPago: 'tarjeta',
        monto: this.formulario.value.montoTarjeta,
        idComanda: idComanda,
      };
      this.gService
        .create('comanda/pago', newPago)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          respMesa = data;
        });
    }
    this.cartService.deleteCart();
  }

  close() {
    //Dentro de close ()
    //this.form.value
    this.dialogRef.close();
  }
}
