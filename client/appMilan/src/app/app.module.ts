import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { MatCardModule } from '@angular/material/card';
import { ProductoModule } from './producto/producto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ShareModule } from './share/share.module';
import { MesaModule } from './mesa/mesa.module';
import { ComandaModule } from './comanda/comanda.module';
import { OrdenModule } from './orden/orden.module';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    CoreModule,
    ShareModule,
    HomeModule,
    ProductoModule,
    UsuarioModule,
    MesaModule,
    ComandaModule,
    OrdenModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
