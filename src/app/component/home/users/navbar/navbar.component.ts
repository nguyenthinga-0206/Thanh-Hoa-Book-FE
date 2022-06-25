import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {BookService} from "../../../../service/book.service";
import {Category} from "../../../../model/book/Category";
import {User} from "../../../../model/user/User";
import {UsersService} from "../../../../service/users.service";
import {OrdersService} from "../../../../service/orders.service";
import {TranslatesService} from "../../../../service/translates.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categoryList!: Array<Category>;
  quantity: number = 0;

  constructor(public authService: AuthService,
              private userService: UsersService,
              private bookService: BookService,
              private ordersService: OrdersService,
              private translatesService: TranslatesService,
              private router: Router) {
  }

  email: string = '' + this.authService.getEmail();
  user!: User;

  ngOnInit(): void {
    if(this.isLoggedIn()){
      this.userService.getProfile(this.email).subscribe(data => {
        this.user = data;
      });
      this.ordersService.getAllCart().subscribe(data => {
        this.quantity = data.cartList.length;
      });
    }
    this.bookService.getAllCategory().subscribe(data => {
      this.categoryList = data;
    });
    if (localStorage.getItem("token") !== null) {
      this.authService.assignSessionStorageWithLocalStorage();
    }
  }

  searchByName(name: string) {
    this.router.navigate(['search?name', name]).then(() => window.location.reload());
  }

  searchByCategory(id: number) {
    this.router.navigate(['category', id]).then(() => window.location.reload());
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

  changeDefaultLanguage(value: string) {
    this.translatesService.changeLanguage(value);
  }

}
