import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookService} from "../../../../service/book.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private bookService: BookService,
              private dialogRef: MatDialogRef<CreateCategoryComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  formAddCategory = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  addCategory() {
    if (!this.formAddCategory.invalid) {
      this.bookService.createCategory(this.formAddCategory.value).subscribe(data => {
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
