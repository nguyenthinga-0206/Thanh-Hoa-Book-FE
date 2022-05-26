import {Component, OnInit} from '@angular/core';
import {User} from "../../../../model/user/User";
import {UsersService} from "../../../../service/users.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateManagementComponent} from "../create-management/create-management.component";
import {EGender} from "../../../../model/user/EGender";
import {UpdateManagementComponent} from "../update-management/update-management.component";
import {ERole} from "../../../../model/user/ERole";

@Component({
  selector: 'app-table-list-user',
  templateUrl: './table-list-user.component.html',
  styleUrls: ['./table-list-user.component.css']
})
export class TableListUserComponent implements OnInit {
  userList!: Array<User>;
  genderEnum = EGender;
  role = ERole;
  p: number | any;

  constructor(private usersService: UsersService,
              private dialog: MatDialog) {
  }

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

  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateManagementComponent, {
      width: '500px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openDialogEdit(user: User) {
    const dialogRef = this.dialog.open(UpdateManagementComponent, {
      width: '500px',
      height: '600px',
      data: user
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
