import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
const routes: Routes = [
    {path:'usuario/detalles', component: UsuarioIndexComponent},
    {path:'usuario/id', component: UsuarioIndexComponent},

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsuarioRoutingModule { }