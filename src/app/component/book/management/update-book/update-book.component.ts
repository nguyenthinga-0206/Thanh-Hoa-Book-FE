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
import {MatOptionSelectionChange} from "@angular/material/core";
import {ImageDTO} from "../../../../dto/book/ImageDTO";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {log} from "util";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  producerList!: Array<Producer>;
  authorList!: Array<Author>;
  authorListError: Boolean = false;
  categoryList!: Array<Category>;
  categorys!: Array<Category>;
  categoryListError: Boolean = false;
  selectedFile!: Array<File> | any[];
  imageList: ImageDTO[] = [];

  constructor(private bookService: BookService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<UpdateBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private angularFireStorage: AngularFireStorage) {
  }

  formUpdateBook = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{1,20}$")]),
    yearPublishing: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{4}$")]),
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
    authorList: new FormControl(),
    producer: new FormGroup({
      id: new FormControl()
    }, [Validators.required]),
    categoryList: new FormControl(),
    description: new FormControl(),
  });

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
    this.formUpdateBook.patchValue({
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
      description: this.data.description,
      producer: this.data.producer,
    });
    this.formUpdateBook.controls.authorList.setValue(this.data.authorList);
    this.formUpdateBook.controls.categoryList.setValue(this.data.categoryList);
    this.formUpdateBook.value.imageList = this.data.imageList;
    this.imageList = this.data.imageList;
    this.categorys = this.data.imageList;
  }

  updateBook() {
    this.formUpdateBook.value.imageList = this.imageList;
    if (!this.formUpdateBook.invalid) {
      this.bookService.editBook(this.formUpdateBook.value).subscribe(
        (data) => {
          this.snackBar.open("Cập nhật thành công", "Đóng", {
            panelClass: ['mat-toolbar', 'mat-primary'],
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
    this.imageList = [];
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
    const authorList = (this.formUpdateBook.controls.authorList as FormArray);
    if (event.source.selected) {
      {
        authorList.push(new FormControl(author));
      }
      this.authorListError = authorList.value.length > 0 ? false : true;
    } else {
      {
        const index = authorList.controls
          .findIndex(x => x.value === author);
        authorList.removeAt(index);
      }
      this.authorListError = authorList.value.length == 0 ? true : false;
    }
  }

  onCheckboxChangeCategory(event: MatOptionSelectionChange, category: Category) {
    const temp = (this.formUpdateBook.controls.categoryList as FormArray);
    const categoryList = temp.value;
    if (event.source.selected) {
        categoryList.push(category);
      this.categoryListError = categoryList.length > 0 ? false : true;
    } else {
        const index = categoryList.findIndex((x: { value: Category; }) => x.value === category);
        categoryList.removeAt(index);
      this.categoryListError = categoryList.length == 0 ? true : false;
    }
  }

  compareFn(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
}
