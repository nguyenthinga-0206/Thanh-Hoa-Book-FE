import {Component, Inject, OnInit} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Book} from "../../../../model/book/Book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddBookDTO} from "../../../../dto/book/AddBookDTO";

@Component({
  selector: 'app-add-detail-book',
  templateUrl: './add-detail-book.component.html',
  styleUrls: ['./add-detail-book.component.css']
})
export class AddDetailBookComponent implements OnInit {

  book!: Book;
  submitting: boolean = false;

  constructor(private bookService: BookService,
              private dialogRef: MatDialogRef<AddDetailBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.book = this.data;
  }

  formAddBook = new FormGroup({
    id: new FormControl(),
    quantity: new FormControl('', [Validators.required, Validators.pattern("^(?!^0$)([1-9][0-9]{0,6})$")]),
  });

  addBook() {
    this.formAddBook.value.id = this.book.id;
    if (this.formAddBook.invalid) {
      this.submitting = true;
    } else {
      this.bookService.addBookById(this.formAddBook.value).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open("Thêm thành công !!!", "OK", {
          duration: 3000
        })
      }, () => {
        this.dialogRef.close();
        this.snackBar.open("Thêm thất bại !", "OK", {
          duration: 3000,
          panelClass: ['warning']
        })
      });
    }
  }
}
