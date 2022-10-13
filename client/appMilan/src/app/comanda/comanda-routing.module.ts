import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuMesasComponent } from './menu-mesas/menu-mesas.component';

const routes: Routes = [
    {
    path: 'mesas',
    component: MenuMesasComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandaRoutingModule { }
