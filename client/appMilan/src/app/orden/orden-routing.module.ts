import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenIndexComponent } from './orden-index/orden-index.component';
import { OrdenPagoComponent } from './orden-pago/orden-pago.component';
import { ReporteVentasXFechaComponent } from './reporte-ventas-xfecha/reporte-ventas-xfecha.component';
import { ReporteVentasXmetodoPagoComponent } from './reporte-ventas-xmetodo-pago/reporte-ventas-xmetodo-pago.component';
import { ReporteXvariosComponent } from './reporte-xvarios/reporte-xvarios.component';

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
    } */},{
    path: 'orden/reporte/ventas/fecha',
    // canActivate:[AuthGuard],
      component: ReporteVentasXFechaComponent,
     /*data:{
       roles:['ADMIN']
     } */},
     {
      path: 'orden/reporte/ventas/metodo',
      // canActivate:[AuthGuard],
        component: ReporteVentasXmetodoPagoComponent,
       /*data:{
         roles:['ADMIN']
       } */},
       {
        path: 'orden/reporte/ventas/varios',
        // canActivate:[AuthGuard],
          component: ReporteXvariosComponent,
         /*data:{
           roles:['ADMIN']
         } */}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenRoutingModule { }
