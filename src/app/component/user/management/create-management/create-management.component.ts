import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from "../../../../service/users.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

function checkpassword(c: AbstractControl) {
  const v = c.value;
  return (v.password1 === v.password2) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-create-management',
  templateUrl: './create-management.component.html',
  styleUrls: ['./create-management.component.css']
})
export class CreateManagementComponent implements OnInit {

  constructor(private userService: UsersService,
              private dialogRef: MatDialogRef<CreateManagementComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  formCreateManagement = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    birthday: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(),
    gender: new FormControl('', [Validators.required]),
    image: new FormControl(),
    account: new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      password: new FormGroup({
        password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
      }, {validators: checkpassword})
    })
  });

  createManagement() {
    if (!this.formCreateManagement.invalid) {
      console.log(this.formCreateManagement.value);
      // this.userService.createManagement(this.formCreateManagement.value).subscribe(
      //   (data) => {
      //     this.snackBar.open("Thêm mới thành công", "Đóng", {
      //       panelClass: ['mat-toolbar', 'mat-primary'],
      //       duration: 3000
      //     });
      //   },
      // );
      this.ngOnInit();
      this.formCreateManagement.reset();
    }
  }

}
