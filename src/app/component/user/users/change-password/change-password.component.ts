import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

function checkpassword(c: AbstractControl) {
  const v = c.value;
  return (v.password1 === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  // password = new FormGroup({
  //   password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
  //   confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  // }, {validators: checkpassword});
}
