import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '../../routing/user-routing.module';
import { CreateManagementComponent } from './management/create-management/create-management.component';
import { UpdateProfileComponent } from './users/update-profile/update-profile.component';


@NgModule({
  declarations: [
    CreateManagementComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
