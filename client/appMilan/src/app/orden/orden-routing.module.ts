import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenIndexComponent } from './orden-index/orden-index.component';
import { OrdenPagoComponent } from './orden-pago/orden-pago.component';

const routes: Routes = [{ 
  path: 'orden',
 // canActivate:[AuthGuard],
   component: OrdenIndexComponent,
  /*data:{
    roles:['ADMIN']
  } */},
  { 
    path: 'orden/pago',
   // canActivate:[AuthGuard],
     component: OrdenPagoComponent,
    /*data:{
      roles:['ADMIN']
    } */}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenRoutingModule { }
