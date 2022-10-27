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

@NgModule({
  declarations: [ProductoIndexComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
   

  ],
  
})
export class ProductoModule { }
