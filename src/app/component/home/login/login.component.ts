import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../../../service/home.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {LoginResponse} from "../../../dto/login/LoginResponse";

@Component({
  selector: 'app-login-management',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorUsername: string = "";
  submitting: boolean = false;

  constructor(private homeService: HomeService,
              private router: Router,
              private authService: AuthService,
              private matSnackBar: MatSnackBar,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.authService.getToken() !== null) {
      this.router.navigate(['/']).then(() => window.location.reload())
    }
  }

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public setLoginComplete(loginResponse: LoginResponse) {
    this.authService.setSessionStorage(loginResponse);
    const role = loginResponse.role;
    switch (role) {
      case "ROLE_USER":
        this.router.navigate(['/']).then(() => window.location.reload());
        break;
      case "ROLE_MANAGEMENT":
        this.router.navigate(['/management']).then(() => window.location.reload());
        break;
      case "ROLE_ADMIN":
        this.router.navigate(['/management']).then(() => window.location.reload());
        break;
      default:
        this.router.navigate(['/forbidden'])
    }
  }

  public login() {
    this.submitting = true;
    if (!this.formLogin.invalid) {
      this.homeService.login(this.formLogin.value).subscribe(
        (loginResponse) => {
          this.setLoginComplete(loginResponse)
        },
        (error) => {
          switch (error.status) {
            case 401:
              this.errorUsername = "Tài khoản hoặc mật khẩu sai";
              break;
            case 423:
              this.errorUsername = "Tài khoản của bạn đã bị khóa";
              break;
            default:
              this.matSnackBar.open("Hệ thống đang bảo trì vui lòng đăng nhập lại", "OK", {
                panelClass: ['mat-toolbar', 'mat-primary'],
                duration: 5000
              });
          }
        }
      )
    }
  }
}
