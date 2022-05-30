import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {BookService} from "../../../../service/book.service";
import {Category} from "../../../../model/book/Category";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categoryList!: Array<Category>;
  titleCategory: string = '';

  constructor(public authService: AuthService,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.bookService.getAllCategory().subscribe(data => {
      this.categoryList = data;
      this.titleCategory = "<button class=''>"
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
