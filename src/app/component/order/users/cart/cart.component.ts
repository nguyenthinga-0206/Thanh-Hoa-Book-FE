import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../../../service/orders.service";
import {Cart} from "../../../../model/order/Cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList!: Array<Cart>;
  total: number = 0;
  quantity: number = 1;
  priceShip: number = 0;
  totalPrice: number = 0;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.ordersService.getAllCart().subscribe(data => {
      this.cartList = data.cartList;
      this.total = data.total;
      if (data.total < 300000) {
        this.priceShip = 30000
      }
      this.totalPrice = data.total + this.priceShip;
    })
  }

  deleteCart(id: number) {
    this.ordersService.deleteCartById(id).subscribe(data => {
      this.ngOnInit();
      console.log("deleted")
    })
  }
}
