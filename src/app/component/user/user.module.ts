import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '../../routing/user-routing.module';
import { CreateManagementComponent } from './management/create-management/create-management.component';
import { UpdateProfileComponent } from './users/update-profile/update-profile.component';
import { TableListUserComponent } from './management/table-list-user/table-list-user.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    CreateManagementComponent,
    UpdateProfileComponent,
    TableListUserComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class UserModule { }
