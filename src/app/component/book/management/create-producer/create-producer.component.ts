import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-producer',
  templateUrl: './create-producer.component.html',
  styleUrls: ['./create-producer.component.css']
})
export class CreateProducerComponent implements OnInit {

  submitting: Boolean = false;

  constructor(private bookService: BookService,
              private dialogRef: MatDialogRef<CreateProducerComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  formAddProducer = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  addProducer() {
    if (this.formAddProducer.invalid) {
      this.submitting = true;
    } else {
      this.bookService.createProducer(this.formAddProducer.value).subscribe(() => {
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
