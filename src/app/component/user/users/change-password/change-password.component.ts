import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../service/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChangePasswordRequest} from "../../../../dto/user/ChangePasswordRequest";
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";

function checkpassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  email: string = '' + this.authService.getEmail();
  changePasswordRequest!: ChangePasswordRequest;
  oldPasswordError: string = '';

  constructor(private authService: AuthService,
              private userService: UsersService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  formChangePassword = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    newPassword: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, {validators: checkpassword})
  });

  changePassword() {
    if (!this.formChangePassword.invalid) {
      this.changePasswordRequest = {
        email: this.email,
        newPassword: this.formChangePassword.value.newPassword.password,
        oldPassword: this.formChangePassword.value.oldPassword
      };
      this.userService.changePassword(this.changePasswordRequest).subscribe(data => {
          this.snackBar.open("Cập nhật thành công", "Đóng", {
            panelClass: ['mat-toolbar', 'mat-primary'],
            duration: 3000
          });
          this.authService.clear();
          this.router.navigate(['/login'])
        },
        error => {
          this.oldPasswordError = 'Mật khẩu cũ không đúng!'
        }
      );
    }
  }

}
