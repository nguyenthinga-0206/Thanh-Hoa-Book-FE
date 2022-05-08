import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '../../routing/user-routing.module';
import { CreateManagementComponent } from './management/create-management/create-management.component';
import { UpdateProfileComponent } from './users/update-profile/update-profile.component';
import { TableListUserComponent } from './management/table-list-user/table-list-user.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    CreateManagementComponent,
    UpdateProfileComponent,
    TableListUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
