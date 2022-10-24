import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 

@NgModule({
  declarations: [
    UsuarioIndexComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
   
    
  ]
})
export class UsuarioModule { }
