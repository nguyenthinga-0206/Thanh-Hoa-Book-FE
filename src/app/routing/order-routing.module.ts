import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableListOrderComponent} from "../component/order/management/table-list-order/table-list-order.component";
import {AuthGuard} from "../guard/auth.guard";

const routes: Routes = [
  {path: "management/order", component: TableListOrderComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_MANAGEMENT']}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
