import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  background = (this.isAdmin() || this.isManagement()) ? '#2A3F54' : '#1ABB9C';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.authService.getRole() == "ROLE_ADMIN";
  }

  isManagement() {
    return this.authService.getRole() == "ROLE_MANAGEMENT";
  }

}
