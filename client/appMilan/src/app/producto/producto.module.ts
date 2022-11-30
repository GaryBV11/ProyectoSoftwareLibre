import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductoRoutingModule } from './producto-routing.module';
import {MatDividerModule} from '@angular/material/divider';
import { ProductoFormComponent } from './producto-form/producto-form.component'; 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import {MatDialogModule} from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductoComponent } from './ventasProductos/producto/producto.component';
@NgModule({
  declarations: [ProductoIndexComponent, ProductoFormComponent,ProductoComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    LayoutModule

  ],
  
})
export class ProductoModule { }
