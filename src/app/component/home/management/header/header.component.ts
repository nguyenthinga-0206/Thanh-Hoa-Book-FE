import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  //sidebar
  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

//sidebar
  public logout() {
    this.authService.clear();
  }

}
