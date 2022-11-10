import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './gestion/gestion.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';

const routes: Routes = [
  {
    path: 'mesas/gestion',
    component: GestionComponent
    },
    {path:'mesas/update/:id', component: MantenimientoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesaRoutingModule { }
