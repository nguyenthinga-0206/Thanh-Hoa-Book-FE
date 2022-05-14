import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {BookService} from "../../../../service/book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookDTO} from "../../../../dto/book/BookDTO";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatDatepicker} from "@angular/material/datepicker";
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    yearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    yearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CreateBookComponent implements OnInit {
  book!: BookDTO;
  private yearPublishing: any;

  constructor(private bookService: BookService,
              dialogRef: MatDialogRef<CreateBookComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  formCreateBook = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    code: new FormControl('', [Validators.required, Validators.pattern("^\d{8}$")]),
    yearPublishing: new FormControl(moment()),
    quantity: new FormControl('', [Validators.required, Validators.pattern("^(?!^0$)([1-9][\d]{0,6})$")]),
    weight: new FormControl('', [Validators.required, Validators.pattern("^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$")]),
    width: new FormControl('', [Validators.required, Validators.pattern("^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$")]),
    lenght: new FormControl('', [Validators.required, Validators.pattern("^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$")]),
    height: new FormControl('', [Validators.required, Validators.pattern("^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$")]),
    pageNumber: new FormControl('', [Validators.required, Validators.pattern("^(?!^0$)([1-9][\d]{0,6})$")]),
    language: new FormControl('', [Validators.required]),
    formCover: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern("^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$")]),
    imageList: new FormArray([], [Validators.required]),
    authorList: new FormArray([], [Validators.required]),
    producerList: new FormArray([], [Validators.required]),
    categoryList: new FormArray([], [Validators.required]),
  });

  createBook() {
    if (!this.formCreateBook.invalid) {
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

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.yearPublishing.value;
    ctrlValue.year(normalizedYear.year());
    this.yearPublishing.setValue(ctrlValue);
    datepicker.close();
  }
}
