import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesaRoutingModule } from './mesa-routing.module';
import { GestionComponent } from './gestion/gestion.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from "@angular/material/dialog";
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleMesaComponent } from './detalle-mesa/detalle-mesa.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    GestionComponent,
    DetalleMesaComponent,
    MantenimientoComponent
  ],
  imports: [
    CommonModule,
    MesaRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule

  ]
})
export class MesaModule { }
