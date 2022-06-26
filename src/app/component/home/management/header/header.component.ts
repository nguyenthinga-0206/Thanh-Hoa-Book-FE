import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {UsersService} from "../../../../service/users.service";
import {stringify} from "querystring";
import {User} from "../../../../model/user/User";
import {TranslatesService} from "../../../../service/translates.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              private userService: UsersService,
              private translatesService: TranslatesService) {
  }

  email: string = '' + this.authService.getEmail();
  user!: User;

  ngOnInit(): void {
    this.userService.getProfile(this.email).subscribe(data => {
      this.user = data;
    })
  }

  public logout() {
    this.authService.clear();
    window.location.reload();
  }

  isAdmin() {
    return this.authService.getRole() == "ROLE_ADMIN";
  }

  changeDefaultLanguage(value: string) {
    this.translatesService.changeLanguage(value);
  }

}
