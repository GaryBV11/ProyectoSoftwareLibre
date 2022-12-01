import { Component, OnInit,Inject } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComandaEnacabezadoComponent } from 'src/app/comanda/comanda-enacabezado/comanda-enacabezado.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  idMesa:number=0;  
  comanda:any;
  detallesList:any;
  producto:any;
  productoEncontrado:boolean=false;
  visible:boolean=true;
  sede:any;
  constructor(private gService: GenericService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private activeRouter: ActivatedRoute) { 
      this. formularioReactice();
      this.obtenerSedes();
     
      
    }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params)=>{
      if(params['id']!=null){
        this.idMesa= params['id'];
      }
    if(this.idMesa!=0){
    this.visible=false;
    this.obtenerMesa();
    
     this.encontrarComnanda(this.idMesa);
    }
  if(this.idMesa==0){
    //LOGICA DE GARY DEL INITIT
  }
    

    }
    );
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
  //AGREGACION DE PRODUCTOS A LA COMANDA EN CASO QUE SEA CON RESERVA DE MESA

 obtenerMesa(){
  this.gService
  .get('mesa/',this.idMesa)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    this.sede = data.idSede;
    this.listaProductos(this.sede);
  });
 }



  encontrarComnanda(mesa:any){
    this.gService
        .get('comanda/last',mesa)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.comanda = data[0].id;
        });
  }
  
  detalleDeComanda(idProducto:any){
    this.gService
    .get('comanda/detalles',this.comanda)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.productoEncontrado=false; 
   
  });
   if(!this.productoEncontrado){}
   this.CrearDetalle(this.comanda,idProducto);
   this.idMesa=0
  }



CrearDetalle(idComanda:any,idProducto:any){
  let dataProducto={idComanda,idProducto,cantidad:1};
  
  this.gService
    .create('comanda/detalles/create', dataProducto)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      
    });
}
 
volverAMesas(){
  this.router.navigate(['/mesas/gestion'], {
    relativeTo: this.route,})
}
 //FIN DE LOGICA HEINER 
}
