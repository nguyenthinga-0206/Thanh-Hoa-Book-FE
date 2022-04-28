import {Component, OnInit} from '@angular/core';
import {Book} from "../../../../model/book/Book";
import {BookService} from "../../../../service/book.service";

@Component({
  selector: 'app-table-list-book',
  templateUrl: './table-list-book.component.html',
  styleUrls: ['./table-list-book.component.css']
})
export class TableListBookComponent implements OnInit {
  bookList!: Array<Book>;
  p: number | any;
  checkPagination = true;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(
      (data) => {
        this.bookList = data
        this.p = 1;
      },
      (error) => {
        console.log("Err")
      }
    );
  }

}
