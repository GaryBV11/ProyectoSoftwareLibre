import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenRoutingModule } from './orden-routing.module';
import { OrdenIndexComponent } from './orden-index/orden-index.component';
import { OrdenPagoComponent } from './orden-pago/orden-pago.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatDialogModule} from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrdenIndexComponent,OrdenPagoComponent],
  imports: [
    CommonModule,
    OrdenRoutingModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OrdenModule {}
