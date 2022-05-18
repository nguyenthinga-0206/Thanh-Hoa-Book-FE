import {Component, Inject, OnInit} from '@angular/core';
import {Producer} from "../../../../model/book/Producer";
import {Author} from "../../../../model/book/Author";
import {Category} from "../../../../model/book/Category";
import {BookService} from "../../../../service/book.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateCategoryComponent} from "../create-category/create-category.component";
import {CreateAuthorComponent} from "../create-author/create-author.component";
import {CreateProducerComponent} from "../create-producer/create-producer.component";
import {Book} from "../../../../model/book/Book";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  producerList!: Array<Producer>;
  authorList!: Array<Author>;
  categoryList!: Array<Category>;

  constructor(private bookService: BookService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<UpdateBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bookService.getAllProducer().subscribe(data => {
      this.producerList = data;
    });
    this.bookService.getAllAuthor().subscribe(data => {
      this.authorList = data;
    });
    this.bookService.getAllCategory().subscribe(data => {
      this.categoryList = data;
    });
    this.formUpdateBook.setValue({
      id: this.data.id,
      name: this.data.name,
      code: this.data.code,
      yearPublishing: this.data.yearPublishing,
      quantity: this.data.quantity,
      weight: this.data.weight,
      width: this.data.width,
      lenght: this.data.lenght,
      height: this.data.height,
      pageNumber: this.data.pageNumber,
      language: this.data.language,
      formCover: this.data.formCover,
      price: this.data.price,
      description: this.data.description ?? null,
      imageList: this.data.imageList ?? null,
      authorList: this.data.authorList.value ?? null,
      producer: this.data.producer,
      categoryList: this.data.categoryList ?? null
    });
  }

  formUpdateBook = new FormGroup({
    id: new FormControl(),
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
    imageList: new FormControl(),
    authorList: new FormArray([]),
    producer: new FormControl([], [Validators.required]),
    categoryList: new FormArray([])
  });

  updateBook() {
    if (!this.formUpdateBook.invalid) {
      console.log(this.formUpdateBook.value);
      this.bookService.editBook(this.formUpdateBook.value).subscribe(
        (data) => {
          this.snackBar.open("Thêm mới thành công", "Đóng", {
            panelClass: ['mat-toolbar', 'mat-primary'],
            duration: 3000
          });
        },
      );
      this.ngOnInit();
      this.formUpdateBook.reset();
    }
  }

  openDialogAddCategory() {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '400px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  openDialogAddAuthor() {
    const dialogRef = this.dialog.open(CreateAuthorComponent, {
      width: '400px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  openDialogAddProducer() {
    const dialogRef = this.dialog.open(CreateProducerComponent, {
      width: '400px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
}
