import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from '../../routing/home-routing.module';
import {FooterComponent} from './management/footer/footer.component';
import {HeaderComponent} from './management/header/header.component';
import {LoginManagementComponent} from "./management/login-management/login-management.component";
import { LoginUserComponent } from './users/login-user/login-user.component';


@NgModule({
    declarations: [
        LoginUserComponent,
        LoginManagementComponent,
        FooterComponent,
        HeaderComponent,
        LoginUserComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ]
})
export class HomeModule {
}
