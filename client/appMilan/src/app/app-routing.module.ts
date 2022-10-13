import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { AcercaDeComponent } from './home/acerca-de/acerca-de.component';
const routes: Routes = [
  {path: '', component: InicioComponent, redirectTo:'',pathMatch:'full' },
  {path:'acerca-de',component:AcercaDeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
