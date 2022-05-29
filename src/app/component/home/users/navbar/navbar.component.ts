import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
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
