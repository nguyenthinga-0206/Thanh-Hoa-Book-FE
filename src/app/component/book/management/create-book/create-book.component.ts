import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BookService} from "../../../../service/book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Producer} from "../../../../model/book/Producer";
import {Author} from "../../../../model/book/Author";
import {Category} from "../../../../model/book/Category";
import {CreateCategoryComponent} from "../create-category/create-category.component";
import {CreateAuthorComponent} from "../create-author/create-author.component";
import {CreateProducerComponent} from "../create-producer/create-producer.component";
import {finalize} from "rxjs/operators";
import {MatOptionSelectionChange} from "@angular/material/core";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Image} from "../../../../model/book/Image";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})

export class CreateBookComponent implements OnInit {
  producerList!: Array<Producer>;
  authorList!: Array<Author>;
  authorListError: Boolean = false;
  categoryList!: Array<Category>;
  categoryListError: Boolean = false;
  selectedFile: File | any;
  name: string = "";
  url: string = "";
  image!: Image;
  imageList!: Array<Image>;

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
    })
  }

  formCreateBook = new FormGroup({
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    yearPublishing: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    width: new FormControl('', [Validators.required]),
    lenght: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    pageNumber: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    formCover: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    imageList: new FormArray([]),
    authorList: new FormArray([], [Validators.required]),
    producer: new FormGroup({
      id: new FormControl()
    }, [Validators.required]),
    categoryList: new FormArray([], [Validators.required]),
    description: new FormControl()
  });

  createBook() {
    this.formCreateBook.value.imageList.push({
      name: this.name,
      path: this.url
    });
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
    const path = Date.now().toString();
    this.selectedFile = event.target.files;
    // for (let file of this.selectedFile) {
    //   this.name = file.name;
    //   console.log(this.name);
    this.angularFireStorage.upload(path, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        this.angularFireStorage.ref(path).getDownloadURL().subscribe(data => {
          this.url = data;
        })
      })
    ).subscribe();
    // this.image.name = this.name;
    // this.image.path = this.url;
    // }
  }

  onCheckboxChangeAuthor(event: MatOptionSelectionChange, author: Author) {
    const authorList = (this.formCreateBook.controls.authorList as FormArray);
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
    const categoryList = (this.formCreateBook.controls.categoryList as FormArray);
    if (event.source.selected) {
      {
        categoryList.push(new FormControl(category));
      }
      this.categoryListError = categoryList.value.length > 0 ? false : true;
    } else {
      {
        const index = categoryList.controls
          .findIndex(x => x.value === category);
        categoryList.removeAt(index);
      }
      this.categoryListError = categoryList.value.length == 0 ? true : false;
    }
  }
}
