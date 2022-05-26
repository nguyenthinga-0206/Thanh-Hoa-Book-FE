import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../component/home/login/login.component";
import {AuthGuard} from "../guard/auth.guard";
import {ForbiddenComponent} from "../component/home/forbidden/forbidden.component";


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {
    path: "management",
    component: LoginComponent,
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
