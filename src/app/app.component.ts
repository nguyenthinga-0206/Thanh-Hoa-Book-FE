import {Component} from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fe-book-thanh-hoa';

  constructor(public authService: AuthService) {
  }

  isAdmin() {
    return this.authService.getRole() == "ROLE_ADMIN";
  }

  isManagement() {
    return this.authService.getRole() == "ROLE_MANAGEMENT";
  }

  isMember() {
    return !this.isAdmin() && !this.isManagement();
  }
}
