import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import {MatButtonModule} from '@angular/material/button';
import {matDialogAnimations, MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    DialogoConfirmacionComponent,
  
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class ShareModule { }
