import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../model/user/User";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {EGender} from "../../../../model/user/EGender";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user!: User;
  gender = EGender;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.user = this.data;
  }

}
