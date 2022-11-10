import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  titleForm:string='Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  sedesList:any;
  productoInfo:any;
  respProducto:any;
  submitted = false;
  productoForm:FormGroup;
  idproducto: number = 0;
  isCreate:boolean=true;
  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) { 
  this.formularioReactive();
  this.listaSedes();
    }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params)=>{
      this.idproducto= params['id'];
      // === !== es igual == !=
      if(this.idproducto!== undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
        //Obtener videojuego a actualizar del API
        this.gService
        .get('producto',this.idproducto)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
           //Cargar datos en el formulario
          this.productoInfo=data;
          this.productoForm.setValue({
            id: this.productoInfo.id,
            descripcion: this.productoInfo.descripcion,
            precio: this.productoInfo.precio,
            ingredientes: this.productoInfo.ingredientes,
            categoria:this.productoInfo.categoria,
            estado:this.productoInfo.estado,
            imagenURL:this.productoInfo.imagenURL,
            sedes: this.productoInfo.sedes.map(({id}) => id)
          })
        });

      }
    });
  }


  formularioReactive(){
    //[null, Validators.required]
    this.productoForm=this.fb.group({
      //Nombre del FormControl: [valor, validación]
      id: null,
      descripcion:[null,Validators.compose([
        Validators.required,Validators.minLength(2),Validators.maxLength(20)
      ])],
      precio:[null, Validators.required],
      ingredientes: [true, Validators.required],
      categoria: [true, Validators.required],
      estado: [true, Validators.required],
      imagenURL: [true, Validators.required],

      //Generos es un FormArray
      sedes:[null, Validators.required]

    });
  }

  listaSedes() {
    this.sedesList = null;
    this.gService
      .list('sede')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.sedesList = data;
      });
  }
  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
  };
   
  crearProducto(): void {
    //Establecer submit verdadero
    this.submitted=true;
	  //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    console.log(this.productoForm.value);
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.productoForm.get('sedes').value.map(x => ({['id'] : x}));

    //Asignar valor al formulario 
    this.productoForm.patchValue({sedes: gFormat});
    
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('producto',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      this.respProducto=data;
      this.router.navigate(['/producto'],{
        queryParams: {create: 'true'}
      })
    });
  

  }

   //Actualizar Videojuego
   actualizarProducto(){
    //Establecer submit verdadero
    this.submitted=true;
	  //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    console.log(this.productoForm.value);
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.productoForm.get('sedes').value.map(x => ({['id'] : x}));

    //Asignar valor al formulario 
    this.productoForm.patchValue({sedes: gFormat});
    
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('producto',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      this.respProducto=data;
      this.router.navigate(['/producto'],{
        queryParams: {update: 'true'}
      })
    });
  }

  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }

ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
  onBack() {
    this.router.navigate(['/producto']);
  }
}
