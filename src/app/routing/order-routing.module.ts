import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableListOrderComponent} from "../component/order/management/table-list-order/table-list-order.component";
import {AuthGuard} from "../guard/auth.guard";
import {CartComponent} from "../component/order/users/cart/cart.component";
import {CheckoutComponent} from "../component/order/users/checkout/checkout.component";
import {StatisticComponent} from "../component/order/management/statistic/statistic.component";
import {StatisticRevenueComponent} from "../component/order/management/statistic-revenue/statistic-revenue.component";

const routes: Routes = [
  {
    path: "management/order",
    component: TableListOrderComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN', 'ROLE_MANAGEMENT']}
  },
  {
    path: "cart", component: CartComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_USER']}
  },
  {
    path: "checkout", component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_USER']}
  },
  {
    path: "checkout/:id", component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_USER']}
  },
  {
    path: "management/statistic",
    component: StatisticComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN']}
  },
  {
    path: "management/statistic-revenue",
    component: StatisticRevenueComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
