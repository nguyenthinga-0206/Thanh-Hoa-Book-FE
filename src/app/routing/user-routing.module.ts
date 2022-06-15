import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableListUserComponent} from "../component/user/management/table-list-user/table-list-user.component";
import {AuthGuard} from "../guard/auth.guard";
import {ProfileComponent} from "../component/user/users/profile/profile.component";
import {ChangePasswordComponent} from "../component/user/users/change-password/change-password.component";
import {HistoryOrdersComponent} from "../component/order/users/history-orders/history-orders.component";

const routes: Routes = [
  {
    path: "management/user",
    component: TableListUserComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN', 'ROLE_MANAGEMENT']}
  },
  {path: "profile", component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
