import {Component, Inject, OnInit} from '@angular/core';
import {Book} from "../../../../model/book/Book";
import {BookService} from "../../../../service/book.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ECover} from "../../../../model/book/ECover";

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {

  book!: Book;
  cover = ECover;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.book = this.data;
  }

}
