import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from '../producto/producto-index/producto-index.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoComponent } from './ventasProductos/producto/producto.component';

const routes: Routes = [
    {path:'producto', component: ProductoIndexComponent},
    {path:'producto/create', component: ProductoFormComponent},
    {path:'productos/ventas', component: ProductoComponent},
    {path:'producto/update/:id', component: ProductoFormComponent},
   

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductoRoutingModule { }