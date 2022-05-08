import { Component, OnInit } from '@angular/core';
import {User} from "../../../../model/user/User";
import {UsersService} from "../../../../service/users.service";

@Component({
  selector: 'app-table-list-user',
  templateUrl: './table-list-user.component.html',
  styleUrls: ['./table-list-user.component.css']
})
export class TableListUserComponent implements OnInit {
  userList!: Array<User>;
  p: number | any;
  checkPagination = true;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAll().subscribe(
      (data) => {
        this.userList = data
        this.p = 1;
      },
      (error) => {
        console.log("Err")
      }
    );
  }

}
