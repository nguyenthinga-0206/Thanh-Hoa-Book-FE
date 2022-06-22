import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableListUserComponent} from "../component/user/management/table-list-user/table-list-user.component";
import {AuthGuard} from "../guard/auth.guard";
import {ProfileComponent} from "../component/user/users/profile/profile.component";

const routes: Routes = [
  {
    path: "management/user",
    component: TableListUserComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN', 'ROLE_MANAGEMENT']}
  },
  {
    path: "profile", component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_USER']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
