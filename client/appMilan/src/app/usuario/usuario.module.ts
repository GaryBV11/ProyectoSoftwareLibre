import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { rolPipe } from 'src/app/pipes/pipes.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UsuarioMantenimientoComponent } from './usuario-mantenimiento/usuario-mantenimiento.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';

@NgModule({
  declarations: [
    UsuarioIndexComponent,
    rolPipe,
    UsuarioMantenimientoComponent,
    UsuarioLoginComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class UsuarioModule {}
