import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginUserComponent} from "../component/home/login-user/login-user.component";
import {LoginManagementComponent} from "../component/home/login-management/login-management.component";
import {RegisterComponent} from "../component/home/register/register.component";

const routes: Routes = [
  {path: "login", component: LoginUserComponent},
  {path: "management", component: LoginManagementComponent},
  {path: "register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
