import { Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
     private gSevice: GenericService,
     private router: Router,
     private route: ActivatedRoute,
    
  ) { 
    
  }

  ngOnInit(): void {

    this.listaProductos();
  }

listaProductos(){
  this.gSevice
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
}

actualizarProducto(id: number) {
  this.router.navigate(['/producto/update', id], {
    relativeTo: this.route,
  });
}

agregarProducto() {
  this.router.navigate(['/producto/create'], {
    relativeTo: this.route,
  });
}
}
