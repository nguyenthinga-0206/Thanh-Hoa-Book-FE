import {Component, Input, OnInit} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {Book} from "../../../../model/book/Book";
import {CartRequest} from "../../../../dto/order/CartRequest";
import {OrdersService} from "../../../../service/orders.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  bookList!: Array<Book>;
  p: number | any;
  cartRequest!: CartRequest;

  constructor(private bookService: BookService,
              private ordersService: OrdersService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(data => {
        this.bookList = data;
        this.p = 1;
      }
    );
  }

  addCart(id: number) {
    this.cartRequest = {
      id: id,
      quantity: 1
    };
    this.ordersService.addCart(this.cartRequest).subscribe(data => {
      this.snackBar.open("Sản phẩm đã được thêm vào giỏ hàng", "OK", {
        duration: 3000
      })
    });
  }

}
