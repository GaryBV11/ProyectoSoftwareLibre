import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { ComandaEnacabezadoComponent } from './comanda-enacabezado/comanda-enacabezado.component';
import { ComandaRoutingModule } from './comanda-routing.module';
import { ComandaDetalleComponent } from '../comanda-detalle/comanda-detalle.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from "@angular/material/dialog";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ComandaEnacabezadoComponent,
    ComandaDetalleComponent
  ],
  imports: [
    CommonModule,
    ComandaRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class ComandaModule { }
