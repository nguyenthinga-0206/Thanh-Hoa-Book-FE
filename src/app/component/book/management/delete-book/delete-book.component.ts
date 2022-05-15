import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Book} from "../../../../model/book/Book";
import {BookService} from "../../../../service/book.service";

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  book!: Book

  constructor(private bookService: BookService,
              private dialogRef: MatDialogRef<DeleteBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.book = this.data;
  }

  deleteConfirm() {
    this.bookService.deleteBookById(this.book.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xóa thành công !!!", "OK", {
        duration: 3000
      })
    }, () => {
      this.dialogRef.close();
      this.snackBar.open("Xóa thất bại !", "OK", {
        duration: 3000,
        panelClass: ['warning']
      })
    });
  }
}
