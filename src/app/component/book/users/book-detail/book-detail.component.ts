import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Book} from "../../../../model/book/Book";
import {ActivatedRoute} from "@angular/router";
import {ECover} from "../../../../model/book/ECover";
import {CartBookDTO} from "../../../../dto/order/CartBookDTO";
import {CartRequest} from "../../../../dto/order/CartRequest";
import {OrdersService} from "../../../../service/orders.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book!: Book;
  bookList!: Array<Book>;
  cover = ECover;
  quantity: number = 1;
  cartRequest!: CartRequest;

  constructor(private bookService: BookService,
              private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bookService.getBookById(this.activatedRoute.snapshot.params["id"]).subscribe(data => {
      this.book = data;
    });
    this.bookService.getAll().subscribe(data => {
      this.bookList = data;
    })
  }

  minusQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  plusQuantity() {
    if (this.quantity < this.book.quantity) {
      this.quantity += 1;
    }
  }

  addCart(id: number) {
    this.cartRequest = {
      id: id,
      quantity: this.quantity
    };
    this.ordersService.addCart(this.cartRequest).subscribe(data => {
      this.snackBar.open("Sản phẩm đã được thêm vào giỏ hàng", "Đóng", {
        duration: 3000
      });
    })
  }
}
