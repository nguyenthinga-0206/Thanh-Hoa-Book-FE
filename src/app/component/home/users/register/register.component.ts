import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../../../../service/home.service";
import {Router} from "@angular/router";
import {RegisterRequest} from "../../../../dto/user/registerRequest";
import {ERole} from "../../../../model/user/ERole";

function checkpassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confimPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequest!: RegisterRequest;
  error: Boolean = false;
  submitting: boolean = false;

  constructor(private homeService: HomeService,
              private router: Router,) {
  }

  ngOnInit(): void {
  }

  formRegister = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.maxLength(45)]),
    passwordGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confimPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, {validators: checkpassword}),
    role: new FormControl(''),
    email: new FormControl("", [Validators.required, Validators.email])
  });

  register() {
    if (this.formRegister.invalid) {
      this.submitting = true;
    } else {
      this.registerRequest = {
        username: this.formRegister.value.username,
        password: this.formRegister.value.passwordGroup.password,
        role: ERole.ROLE_USER,
        email: this.formRegister.value.email,
      };
      this.homeService.register(this.registerRequest).subscribe(data => {
          this.router.navigate(['/login']);
        },
        error => {
          if (error.status == 400) {
            this.error = true;
          }
        }
      );
    }
  }
}
