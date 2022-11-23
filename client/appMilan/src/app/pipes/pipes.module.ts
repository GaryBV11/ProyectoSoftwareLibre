import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadosMesaPipe'
})
export class estadosMesaPipe implements PipeTransform {

  transform(value: string): any {
    switch (value) {
    case 'libre': return 'Libre';
      case 'inactiva': return 'Inactiva';
      case 'reservada': return 'Reservada';
      case 'ocupada': return 'Ocupada';
      case 'cuentaPendiente': return 'Cuenta pendiente';
      case 'comandaRegistrada': return 'Comanda registrada';   
     default:  null;
    }
  }
}

@Pipe({
  name: 'rolPipe'
})
export class rolPipe implements PipeTransform {

  transform(value: string): any {
    switch (value) {
    case 'mesero': return 'Mesero';
      case 'administrador': return 'Administrador';
      case 'cliente': return 'Cliente';  
     default:  null;
    }
  }
}

