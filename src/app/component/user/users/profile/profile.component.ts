import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {UsersService} from "../../../../service/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../../model/user/User";
import {EGender} from "../../../../model/user/EGender";
import {EStatus} from "../../../../model/order/EStatus";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile!: User;
  email: string = '';
  gender!: EGender;

  constructor(public authService: AuthService,
              private userService: UsersService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.email += this.authService.getEmail();
    this.userService.getProfile(this.email).subscribe(data => {
      this.profile = data;
    });
  }

  isAdmin() {
    return this.authService.getRole() == "ROLE_ADMIN";
  }

}
