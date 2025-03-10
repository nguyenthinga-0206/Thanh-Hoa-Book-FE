import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BookService} from "../../../../service/book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Producer} from "../../../../model/book/Producer";
import {Author} from "../../../../model/book/Author";
import {Category} from "../../../../model/book/Category";
import {CreateCategoryComponent} from "../create-category/create-category.component";
import {CreateAuthorComponent} from "../create-author/create-author.component";
import {CreateProducerComponent} from "../create-producer/create-producer.component";
import {finalize} from "rxjs/operators";
import {MatOptionSelectionChange} from "@angular/material/core";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ImageDTO} from "../../../../dto/book/ImageDTO";

function checkYear(c: AbstractControl) {
  const v = c.value;
  const year = new Date().getFullYear().toString();
  return (v <= year) ? null : {
    yearnotmatch: true
  };
}

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})

export class CreateBookComponent implements OnInit {

  producerList!: Array<Producer>;
  authorList!: Array<Author>;
  categoryList!: Array<Category>;
  selectedFile!: Array<File> | any[];
  imageList: ImageDTO[] = [];
  submitting: boolean = false;

  constructor(private bookService: BookService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<CreateBookComponent>,
              private snackBar: MatSnackBar,
              private angularFireStorage: AngularFireStorage) {
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
  }

  formCreateBook = new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{1,20}$")]),
    yearPublishing: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{4}$"), checkYear]),
    quantity: new FormControl('', [Validators.required, Validators.pattern("^(?!^0$)([1-9][0-9]{0,6})$")]),
    weight: new FormControl('', [Validators.required, Validators.pattern("^(?!^0\.00$)([1-9][0-9]{0,6})|([0])\.[0-9]{2}$")]),
    width: new FormControl('', [Validators.required, Validators.pattern("^(?!^0\.00$)([1-9][0-9]{0,6})|([0])\.[0-9]{2}$")]),
    lenght: new FormControl('', [Validators.required, Validators.pattern("^(?!^0\.00$)([1-9][0-9]{0,6})|([0])\.[0-9]{2}$")]),
    height: new FormControl('', [Validators.pattern("^(?!^0\.00$)([0-9][0-9]{0,6})|([0])\.[0-9]{2}$")]),
    pageNumber: new FormControl('', [Validators.pattern("^(?!^0$)([1-9][0-9]{0,6})$")]),
    language: new FormControl(null),
    formCover: new FormControl(null),
    price: new FormControl('', [Validators.required, Validators.pattern("^(?!^0\.00$)([1-9][0-9]{0,12})|([0])\.[0-9]{2}$")]),
    imageList: new FormArray([]),
    authorList: new FormControl('', [Validators.required]),
    producer: new FormGroup({
      id: new FormControl()
    }, [Validators.required]),
    categoryList: new FormControl('', [Validators.required]),
    description: new FormControl()
  });

  createBook() {
    this.formCreateBook.value.imageList = this.imageList;
    if (this.formCreateBook.invalid) {
      this.submitting = true;
    } else {
      this.bookService.createBook(this.formCreateBook.value).subscribe(
        (data) => {
          this.snackBar.open("Thêm mới thành công", "Đóng", {
            duration: 3000
          });
        },
      );
      this.ngOnInit();
      this.dialogRef.close();
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

  selectFile(event: any) {
    this.selectedFile = event.target.files;
    for (let file of this.selectedFile) {
      const path = Date.now().toString();
      this.angularFireStorage.upload(path, file).snapshotChanges().pipe(
        finalize(() => {
          this.angularFireStorage.ref(path).getDownloadURL().subscribe(data => {
            this.imageList.push({
              name: file.name, path: data
            })
          })
        })
      ).subscribe();

    }
  }

  onCheckboxChangeAuthor(event: MatOptionSelectionChange, author: Author) {
    const temp = (this.formCreateBook.controls.authorList as FormArray);
    const authorList = temp.value;
    if (event.source.selected) {
    } else {
      const index = authorList.findIndex((x: { value: Author }) => x.value === author);
      authorList.splice(index, 1);
    }
  }

  onCheckboxChangeCategory(event: MatOptionSelectionChange, category: Category) {
    const temp = (this.formCreateBook.controls.categoryList as FormArray);
    const categoryList = temp.value;
    if (event.source.selected) {
    } else {
      const index = categoryList.findIndex((x: { value: Category; }) => x.value === category);
      categoryList.splice(index, 1);
    }
  }

}
