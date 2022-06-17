import {Component, OnInit} from '@angular/core';
import {Orders} from "../../../../model/order/Orders";
import {OrdersService} from "../../../../service/orders.service";
import {MatDialog} from "@angular/material/dialog";
import {EStatus} from "../../../../model/order/EStatus";
import {OrderDetailsComponent} from "../order-details/order-details.component";
import {OrderStatusComponent} from "../order-status/order-status.component";

@Component({
  selector: 'app-table-list-order',
  templateUrl: './table-list-order.component.html',
  styleUrls: ['./table-list-order.component.css']
})
export class TableListOrderComponent implements OnInit {

  oderList!: Array<Orders>;
  statusEnum = EStatus;
  p: number | any;
  searchText: any;
  order: string = '';
  reverse: boolean = false;
  caseInsensitive: boolean = false;

  constructor(private ordersService: OrdersService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.ordersService.getAll().subscribe(data => {
      this.oderList = data;
      this.p = 1;
    })
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  openDialogEdit(order: Orders) {
    const dialogRef = this.dialog.open(OrderStatusComponent, {
      width: '400px',
      height: '300px',
      data: order
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openDialogDetail(id: number) {
    this.ordersService.getById(id).subscribe(data => {
        const dialogRef = this.dialog.open(OrderDetailsComponent, {
          width: '600px',
          height: '800px',
          data: data
        });

        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }
}
