import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {Book} from "../../../../model/book/Book";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  bookList!: Array<Book>;
  p: number | any;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(data => {
        this.bookList = data;
        this.p = 1;
      }
    );
  }

  addCart(id: number) {

  }
}
