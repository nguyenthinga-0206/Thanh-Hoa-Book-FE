import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../../../service/orders.service";
import {TopBookResponse} from "../../../../dto/order/TopBookResponse";

@Component({
  selector: 'app-statistic-revenue',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  topBook: TopBookResponse[] = [];

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.ordersService.getTopBook().subscribe(data => {
      this.topBook = data;
    })
  }

}
