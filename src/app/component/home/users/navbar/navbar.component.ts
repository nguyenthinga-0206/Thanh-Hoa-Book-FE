import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {BookService} from "../../../../service/book.service";
import {Category} from "../../../../model/book/Category";
import {User} from "../../../../model/user/User";
import {UsersService} from "../../../../service/users.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categoryList!: Array<Category>;

  constructor(public authService: AuthService,
              private userService: UsersService,
              private bookService: BookService,
              private router: Router) {
  }

  email: string = '' + this.authService.getEmail();
  user!: User;

  ngOnInit(): void {
    this.userService.getProfile(this.email).subscribe(data => {
      this.user = data;
    });
    this.bookService.getAllCategory().subscribe(data => {
      this.categoryList = data;
    });
    if (localStorage.getItem("token") !== null) {
      this.authService.assignSessionStorageWithLocalStorage();
    }
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.clear();
  }

  home() {
    this.router.navigateByUrl("/").then(() => window.location.reload());
  }
}
