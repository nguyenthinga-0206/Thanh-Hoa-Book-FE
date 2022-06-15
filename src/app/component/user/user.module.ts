import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '../../routing/user-routing.module';
import { CreateManagementComponent } from './management/create-management/create-management.component';
import { TableListUserComponent } from './management/table-list-user/table-list-user.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import {MatDialogModule} from "@angular/material/dialog";
import { UpdateManagementComponent } from './management/update-management/update-management.component';
import { ProfileComponent } from './users/profile/profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {OrderModule} from "../order/order.module";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    CreateManagementComponent,
    UpdateManagementComponent,
    TableListUserComponent,
    ChangePasswordComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatListModule,
    OrderModule,
    MatInputModule
  ]
})
export class UserModule { }
