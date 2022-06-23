import {Component, Inject, OnInit} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../../model/user/User";
import {EGender} from "../../../../model/user/EGender";
import {UsersService} from "../../../../service/users.service";

@Component({
  selector: 'app-delete-management',
  templateUrl: './delete-management.component.html',
  styleUrls: ['./delete-management.component.css']
})
export class DeleteManagementComponent implements OnInit {

  user!: User;
  gender = EGender;

  constructor(private usersService: UsersService,
              private dialogRef: MatDialogRef<DeleteManagementComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.user = this.data;
  }

  deleteConfirm() {
    this.usersService.deleteUser(this.user.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xóa thành công !!!", "OK", {
        duration: 3000
      })
    }, () => {
      this.dialogRef.close();
      this.snackBar.open("Xóa thất bại !", "OK", {
        duration: 3000,
        panelClass: ['warning']
      })
    });
  }
}
