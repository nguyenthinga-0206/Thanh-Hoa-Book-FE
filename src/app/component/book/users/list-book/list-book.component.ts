import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {Book} from "../../../../model/book/Book";
import {CartRequest} from "../../../../dto/order/CartRequest";
import {OrdersService} from "../../../../service/orders.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavbarComponent} from "../../../home/users/navbar/navbar.component";
import {ActivatedRoute, Router} from "@angular/router";

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
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    var categoryId = this.activatedRoute.snapshot.params["id"];
    var searchName = this.activatedRoute.snapshot.params["name"];
    if (searchName != undefined) {
      this.bookService.getBookByName(searchName).subscribe(data => {
        this.bookList = data;
        this.p = 1;
      });
    } else if (categoryId != null) {
      this.bookService.getBookByCategory(categoryId).subscribe(data => {
        this.bookList = data;
        this.p = 1;
      });
    } else {
      this.bookService.getAll().subscribe(data => {
          this.bookList = data;
          this.p = 1;
        },
      );
    }
  }

  addCart(id: number) {
    this.cartRequest = {
      id: id,
      quantity: 1
    };
    this.ordersService.addCart(this.cartRequest).subscribe(data => {
      this.snackBar.open("Sản phẩm đã được thêm vào giỏ hàng", "OK", {
        duration: 3000
      });
      window.location.reload();
    });
  }

}
