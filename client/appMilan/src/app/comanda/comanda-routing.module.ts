import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComandaEnacabezadoComponent } from './comanda-enacabezado/comanda-enacabezado.component';

const routes: Routes = [
  {path:'comanda', component: ComandaEnacabezadoComponent},

  {path:'comanda/detalles:id', component: ComandaEnacabezadoComponent},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ComandaRoutingModule { }
