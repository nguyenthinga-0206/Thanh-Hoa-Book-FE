import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from '../../routing/user-routing.module';
import {CreateManagementComponent} from './management/create-management/create-management.component';
import {TableListUserComponent} from './management/table-list-user/table-list-user.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ChangePasswordComponent} from './users/change-password/change-password.component';
import {MatDialogModule} from "@angular/material/dialog";
import {UpdateManagementComponent} from './management/update-management/update-management.component';
import {ProfileComponent} from './users/profile/profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {OrdersModule} from "../order/orders.module";
import {MatInputModule} from "@angular/material/input";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {OrderModule} from "ngx-order-pipe";
import {UserDetailComponent} from './management/user-detail/user-detail.component';
import {DeleteManagementComponent} from './management/delete-management/delete-management.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    CreateManagementComponent,
    UpdateManagementComponent,
    TableListUserComponent,
    ChangePasswordComponent,
    ProfileComponent,
    UserDetailComponent,
    DeleteManagementComponent,
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
    OrdersModule,
    MatInputModule,
    Ng2SearchPipeModule,
    OrderModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ]
})
export class UserModule {
}
