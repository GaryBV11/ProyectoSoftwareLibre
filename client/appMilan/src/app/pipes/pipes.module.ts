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


@Pipe({
  name: 'productoPipe'
})
export class productoPipe implements PipeTransform {

  transform(value: string): any {
    switch (value) {
      case 'platoPrincipal': return 'Plato Principal';
      case 'bebida': return 'Bebida';
      case 'entrada': return 'Entrada';  
     default:  null;
    }
  }
}

@Pipe({
  name: 'comandaPipe'
})
export class comandaPipe implements PipeTransform {

  transform(value: string): any {
    switch (value) {
      case 'cancelada': return 'Libre';
      case 'registrado': return 'Registrado';
      case 'enProceso': return 'En Proceso';
      case 'pendiente': return 'Pendiente';   
      case 'entregada': return 'Entregada'; 
      case 'porPagar': return 'Por Pagar'; 
     default:  null;
    }
  }
}


