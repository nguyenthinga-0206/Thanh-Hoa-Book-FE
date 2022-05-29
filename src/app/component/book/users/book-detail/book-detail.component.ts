import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Book} from "../../../../model/book/Book";
import {ActivatedRoute} from "@angular/router";
import {ECover} from "../../../../model/book/ECover";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book!: Book;
  cover = ECover;
  quantity: number = 1;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bookService.getBookById(this.activatedRoute.snapshot.params["id"]).subscribe(data => {
      this.book = data;
      console.log(this.book.description);
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

  }
}
