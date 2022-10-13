import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComandaRoutingModule } from './comanda-routing.module';
import { MenuMesasComponent } from './menu-mesas/menu-mesas.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    MenuMesasComponent
  ],
  imports: [
    CommonModule,
    ComandaRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ComandaModule { }
