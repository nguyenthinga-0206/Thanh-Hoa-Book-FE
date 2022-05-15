import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {BookService} from "../../../../service/book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookDTO} from "../../../../dto/book/BookDTO";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Producer} from "../../../../model/book/Producer";
import {Author} from "../../../../model/book/Author";
import {Category} from "../../../../model/book/Category";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})

export class CreateBookComponent implements OnInit {
  book!: BookDTO;
  producerList!: Array<Producer>;
  authorList!: Array<Author>;
  categoryList!: Array<Category>;

  constructor(private bookService: BookService,
              dialogRef: MatDialogRef<CreateBookComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bookService.getAllProducer().subscribe(data => {
      this.producerList = data;
    })
    this.bookService.getAllAuthor().subscribe(data => {
      this.authorList = data;
    })
    this.bookService.getAllCategory().subscribe(data => {
      this.categoryList = data;
    })
  }

  formCreateBook = new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    yearPublishing: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required,]),
    width: new FormControl('', [Validators.required,]),
    lenght: new FormControl('', [Validators.required,]),
    height: new FormControl('', [Validators.required,]),
    pageNumber: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    formCover: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    imageList: new FormArray([]),
    authorList: new FormArray([]),
    producer: new FormControl([], [Validators.required]),
    categoryList: new FormArray([])
  });

  createBook() {
    if (!this.formCreateBook.invalid) {
      console.log(this.formCreateBook.value);
      this.bookService.createBook(this.formCreateBook.value).subscribe(
        (data) => {
          this.snackBar.open("Thêm mới thành công", "Đóng", {
            panelClass: ['mat-toolbar', 'mat-primary'],
            duration: 3000
          });
        },
      );
      this.ngOnInit();
      this.formCreateBook.reset();
    }
  }
}
