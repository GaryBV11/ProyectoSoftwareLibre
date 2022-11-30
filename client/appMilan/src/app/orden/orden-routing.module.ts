import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenIndexComponent } from './orden-index/orden-index.component';

const routes: Routes = [{ 
  path: 'orden',
 // canActivate:[AuthGuard],
   component: OrdenIndexComponent,
  /*data:{
    roles:['ADMIN']
  } */}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenRoutingModule { }
