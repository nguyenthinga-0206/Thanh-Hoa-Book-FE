import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../service/users.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-create-management',
  templateUrl: './create-management.component.html',
  styleUrls: ['./create-management.component.css']
})
export class CreateManagementComponent implements OnInit {

  selectedFile: File | any;
  url: string = "";

  constructor(private userService: UsersService,
              private dialogRef: MatDialogRef<CreateManagementComponent>,
              private snackBar: MatSnackBar,
              private angularFireStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  formCreateManagement = new FormGroup({
    account: new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('', [Validators.required])
    }),
    fullName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    birthday: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0][0-9]{9}$")]),
    gender: new FormControl('', [Validators.required]),
    image: new FormControl()
  });

  createManagement() {
    this.formCreateManagement.value.image = this.url;
    if (!this.formCreateManagement.invalid) {
      this.userService.createManagement(this.formCreateManagement.value).subscribe(() => {
          this.snackBar.open("Thêm mới thành công", "Đóng", {
            panelClass: ['mat-toolbar', 'mat-primary'],
            duration: 3000
          });
        },
      );
      this.ngOnInit();
      this.formCreateManagement.reset();
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
