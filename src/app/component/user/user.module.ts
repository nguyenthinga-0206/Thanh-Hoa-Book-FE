import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '../../routing/user-routing.module';
import { CreateManagementComponent } from './management/create-management/create-management.component';
import { UpdateProfileComponent } from './users/update-profile/update-profile.component';
import { TableListUserComponent } from './management/table-list-user/table-list-user.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    CreateManagementComponent,
    UpdateProfileComponent,
    TableListUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class UserModule { }
