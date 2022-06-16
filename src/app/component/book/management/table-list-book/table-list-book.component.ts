import {Component, OnInit} from '@angular/core';
import {Book} from "../../../../model/book/Book";
import {BookService} from "../../../../service/book.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateBookComponent} from "../create-book/create-book.component";
import {DeleteBookComponent} from "../delete-book/delete-book.component";
import {AddDetailBookComponent} from "../add-detail-book/add-detail-book.component";
import {UpdateBookComponent} from "../update-book/update-book.component";
import {DetailBookComponent} from "../detail-book/detail-book.component";
import {OrderPipe} from "ngx-order-pipe";

@Component({
  selector: 'app-table-list-book',
  templateUrl: './table-list-book.component.html',
  styleUrls: ['./table-list-book.component.css']
})
export class TableListBookComponent implements OnInit {
  bookList!: Array<Book>;
  p: number | any;
  searchText: any;
  order: string = '';
  reverse: boolean = false;
  caseInsensitive: boolean = false;

  constructor(private bookService: BookService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(data => {
        this.bookList = data;
        this.p = 1;
      }
    );
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateBookComponent, {
      width: '700px',
      height: '700px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openDialogAdd(id: number) {
    this.bookService.getBookById(id).subscribe(data => {
        const dialogRef = this.dialog.open(AddDetailBookComponent, {
          width: '400px',
          height: '300px',
          data: data
        });

        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  openDialogEdit(id: number) {
    this.bookService.getBookById(id).subscribe(data => {
        const dialogRef = this.dialog.open(UpdateBookComponent, {
          width: '500px',
          height: '800px',
          data: data
        });

        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      }
    )
  }

  openDialogDetail(book: Book) {
    const dialogRef = this.dialog.open(DetailBookComponent, {
      width: '500px',
      height: '400px',
      data: book
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openDialogDelete(book: Book) {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      width: '400px',
      height: '350px',
      data: book
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
