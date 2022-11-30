import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  qtyItems:Number = 0;
  constructor(private cartService: CartService,
    /*private authService: AuthenticationService*/) { }

  ngOnInit(): void {
        //Suscribirse al observable que gestiona la cantidad de items del carrito
        this.cartService.countItems.subscribe((value)=>{
          this.qtyItems=value;
  });
  }
}
