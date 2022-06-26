import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {UsersService} from "../../../../service/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../../model/user/User";
import {EGender} from "../../../../model/user/EGender";
import {EStatus} from "../../../../model/order/EStatus";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {stringify} from "querystring";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile!: User;
  email: string = '' + this.authService.getEmail();
  is_edit: boolean = true;
  selectedFile: File | any;
  url?: string = '';
  maxDay = new Date().toISOString().slice(0, 10);
  background = (this.isAdmin() || this.isManagement()) ? '#2A3F54' : '#1ABB9C';

  constructor(public authService: AuthService,
              private userService: UsersService,
              private angularFireStorage: AngularFireStorage,
              private snackBar: MatSnackBar) {
  }

  formUpdateProfile = new FormGroup({
    id: new FormControl(),
    account: new FormGroup({
      username: new FormControl({value: '', disabled: this.is_edit}),
      password: new FormControl(),
      role: new FormControl()
    }),
    fullName: new FormControl(),
    birthday: new FormControl(),
    email: new FormControl({value: '', disabled: this.is_edit}),
    gender: new FormControl(),
    image: new FormControl()
  });

  ngOnInit(): void {
    this.userService.getProfile(this.email).subscribe(data => {
      this.profile = data;
      this.formUpdateProfile.setValue({
        id: data.id,
        account: {
          username: data.account.username,
          password: data.account.password,
          role: data.account.role
        },
        fullName: data.fullName,
        birthday: data.birthday,
        email: data.email,
        gender: data.gender,
        image: null
      });
      this.url = data.image;
    });
  }

  editProfile() {
    this.formUpdateProfile.value.account.username = this.profile.account.username;
    this.formUpdateProfile.value.email = this.profile.email;
    this.formUpdateProfile.value.image = this.url;
    this.userService.updateProfile(this.formUpdateProfile.value).subscribe(data => {
      this.snackBar.open("Cập nhật thành công", "Đóng", {
        panelClass: ['mat-toolbar', 'mat-primary'],
        duration: 3000
      });
      this.ngOnInit();
      this.is_edit = true;
    });
  }

  selectFile(event: any) {
    const path = Date.now().toString();
    this.selectedFile = event.target.files[0];
    this.angularFireStorage.upload(path, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        this.angularFireStorage.ref(path).getDownloadURL().subscribe(data => {
          this.url = data;
        })
      })
    ).subscribe();
  }

  checkStatus(event: boolean) {
    this.is_edit = event;
  }

  isAdmin() {
    return this.authService.getRole() == "ROLE_ADMIN";
  }

  isManagement() {
    return this.authService.getRole() == "ROLE_MANAGEMENT";
  }

}
