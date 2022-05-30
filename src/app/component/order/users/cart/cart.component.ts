import { Component, OnInit } from '@angular/core';
import {CartDTO} from "../../../../dto/order/CartDTO";
import {OrdersService} from "../../../../service/orders.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList!: Array<CartDTO>;
  quantity: number = 1;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
  }

  minusQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  plusQuantity() {
    if (this.quantity < 10) {
      this.quantity += 1;
    }
  }

}
