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
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from "@angular/material/dialog";
import { ReactiveFormsModule } from '@angular/forms';
import { ComandaDetalleComponent } from './comanda-detalle/comanda-detalle.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { productoPipe } from 'src/app/pipes/pipes.module';
import { comandaPipe } from 'src/app/pipes/pipes.module';
import { ComandaNotaComponent } from './comanda-nota/comanda-nota.component';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    ComandaNotaComponent,
    ComandaEnacabezadoComponent,
    ComandaDetalleComponent,
    productoPipe,
    comandaPipe,
    ComandaNotaComponent,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
  ]
})
export class ComandaModule { }
