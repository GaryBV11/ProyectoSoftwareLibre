import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from '../producto/producto-index/producto-index.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoComponent } from './ventasProductos/producto/producto.component';

const routes: Routes = [
    {path:'producto', component: ProductoIndexComponent, canActivate: [AuthGuard],
    data: {
      roles: ['administrador'],
    },},
    {path:'producto/create', component: ProductoFormComponent,  canActivate: [AuthGuard],
    data: {
      roles: ['administrador'],
    },},
    {path:'productos/ventas', component: ProductoComponent},
    {path:'productos/ventas/:id', component: ProductoComponent},
    {path:'producto/update/:id', component: ProductoFormComponent,canActivate: [AuthGuard],
    data: {
      roles: ['administrador'],
    },},
   

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductoRoutingModule { }