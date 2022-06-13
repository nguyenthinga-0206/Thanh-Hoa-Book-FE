import {Component, OnInit} from '@angular/core';
import {CartDTO} from "../../../../dto/order/CartDTO";
import {OrdersService} from "../../../../service/orders.service";
import {Cart} from "../../../../model/order/Cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDTO!: CartDTO;
  quantity: number = 1;
  priceShip: number = 0;
  totalPrice: number = 0;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.ordersService.getAllCart().subscribe(data => {
      this.cartDTO = data;
      if (this.cartDTO.total < 300000) {
        this.priceShip = 30000
      }
    })
  }

  deleteCart(id: number) {
    this.ordersService.deleteCartById(id).subscribe(data => {
      this.ngOnInit();
      console.log("deleted")
    })
  }
}
