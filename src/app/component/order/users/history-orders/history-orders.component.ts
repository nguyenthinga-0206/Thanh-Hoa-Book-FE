import {Component, Input, OnInit} from '@angular/core';
import {OrdersService} from "../../../../service/orders.service";
import {OrderResponse} from "../../../../dto/order/OrderResponse";
import {EStatus} from "../../../../model/order/EStatus";

@Component({
  selector: 'app-history-orders',
  templateUrl: './history-orders.component.html',
  styleUrls: ['./history-orders.component.css']
})
export class HistoryOrdersComponent implements OnInit {

  orderList!: Array<OrderResponse>;
  @Input('statusInput')
  statusInput: string = '';

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.ordersService.getOrderHisory(this.statusInput).subscribe(data => {
      this.orderList = data;
    })
  }

  changeStatus(status: EStatus) {

  }

}
