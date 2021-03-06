import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../component/home/login/login.component";
import {AuthGuard} from "../guard/auth.guard";
import {ForbiddenComponent} from "../component/home/forbidden/forbidden.component";
import {RegisterComponent} from "../component/home/users/register/register.component";
import {HomeAdminComponent} from "../component/home/management/home-admin/home-admin.component";


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {
    path: "management", component: HomeAdminComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN', 'ROLE_MANAGEMENT']}
  },
  {path: "forbidden", component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
