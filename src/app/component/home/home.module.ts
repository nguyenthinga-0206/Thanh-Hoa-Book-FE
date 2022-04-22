import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from '../../routing/home-routing.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginManagementComponent } from './login-management/login-management.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    LoginUserComponent,
    LoginManagementComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
