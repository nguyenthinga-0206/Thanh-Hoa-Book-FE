import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginManagementComponent} from "../component/home/management/login-management/login-management.component";


const routes: Routes = [
  {path: "login", component: LoginManagementComponent},
  {path: "management", component: LoginManagementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
