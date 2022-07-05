import {Component, Inject, OnInit} from '@angular/core';
import {OrdersService} from "../../../../service/orders.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Orders} from "../../../../model/order/Orders";
import {OrderDetails} from "../../../../model/order/OrderDetails";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order!: Orders;
  orderDetailList!: Array<OrderDetails>;
  count: number = 0;
  totalPrice: number = 0;

  constructor(private orderService: OrdersService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.order = this.data;
    this.orderDetailList = this.data.orderDetailsList;
    this.count = this.orderDetailList.length;
    for (let detail of this.orderDetailList) {
      this.totalPrice += detail.quantity * detail.book.price;
    }
  }

}
