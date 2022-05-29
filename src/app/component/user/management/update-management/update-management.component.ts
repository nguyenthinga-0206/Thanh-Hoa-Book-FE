import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from "../../../../service/users.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-update-management',
  templateUrl: './update-management.component.html',
  styleUrls: ['./update-management.component.css']
})
export class UpdateManagementComponent implements OnInit {

  selectedFile: File | any;
  url: string = "";

  constructor(private userService: UsersService,
              private dialogRef: MatDialogRef<UpdateManagementComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private angularFireStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.formUpdateManagement.setValue({
      id: this.data.id,
      account: {
        username: this.data.account.username,
        password: this.data.account.password,
        role: this.data.account.role
      },
      fullName: this.data.fullName,
      birthday: this.data.birthday,
      email: this.data.email,
      phone: this.data.phone,
      gender: this.data.gender,
      image: null
    });
    this.url = this.data.image;
  }

  formUpdateManagement = new FormGroup({
    id: new FormControl(),
    account: new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      password: new FormControl(),
      role: new FormControl('', [Validators.required])
    }),
    fullName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    birthday: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0][0-9]{9}$")]),
    gender: new FormControl('', [Validators.required]),
    image: new FormControl()
  });

  editManagement() {
    this.formUpdateManagement.setValue({
      id: this.data.id,
      // account: {password: this.data.account.password},
      image: this.url
    });
    console.log(this.formUpdateManagement.value);
    if (!this.formUpdateManagement.invalid) {
      this.userService.createManagement(this.formUpdateManagement.value).subscribe(() => {
          this.snackBar.open("Cập nhật thành công", "Đóng", {
            panelClass: ['mat-toolbar', 'mat-primary'],
            duration: 3000
          });
        },
      );
      this.ngOnInit();
      this.formUpdateManagement.reset();
    }
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
}