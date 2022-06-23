import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrdersService} from "../../../../service/orders.service";
import {Orders} from "../../../../model/order/Orders";
import {StatusDTO} from "../../../../dto/order/StatusDTO";

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  order!: Orders;
  status: string[] | any;
  statusArr: string[][] = [['PENDING', 'Chờ xác nhận'], ['WAITING', 'Chờ lấy hàng'], ['DELIVERY', 'Đang giao'], ['DELIVERED', 'Đã giao']];
  statusDTO!: StatusDTO;

  constructor(private orderService: OrdersService,
              private dialogRef: MatDialogRef<OrderStatusComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.order = this.data;
    if (this.order.status == 'WAITING') {
      this.statusArr = [['WAITING', 'Chờ lấy hàng'], ['DELIVERY', 'Đang giao'], ['DELIVERED', 'Đã giao']];
    }
    if (this.order.status == 'DELIVERY') {
      this.statusArr = [['DELIVERY', 'Đang giao'], ['DELIVERED', 'Đã giao']];
    }
  }

  changeStatus(status: string) {
    this.status = status.split(',');
  }

  editStatus() {
    if (this.status == undefined || this.status[0] == this.order.status) {
      this.dialogRef.close();
      this.snackBar.open('Trạng thái chưa được thay đổi !', "OK", {
        duration: 3000
      });
    } else {
      this.statusDTO = {
        id: this.order.id,
        status: this.status[0]
      };
      this.orderService.editStatus(this.statusDTO).subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.open('Trạng thái đã đổi thành ' + this.status[1], "OK", {
            duration: 3000
          });
        }
      );
    }
  }
}
