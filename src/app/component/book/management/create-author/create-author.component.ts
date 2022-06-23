import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {

  submitting: boolean = false;

  constructor(private bookService: BookService,
              private dialogRef: MatDialogRef<CreateAuthorComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  formAddAuthor = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  addAuthor() {
    this.submitting = true;
    if (!this.formAddAuthor.invalid) {
      this.bookService.createAuthor(this.formAddAuthor.value).subscribe(data => {
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
