import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableListOrderComponent} from "../component/order/management/table-list-order/table-list-order.component";
import {AuthGuard} from "../guard/auth.guard";
import {CartComponent} from "../component/order/users/cart/cart.component";
import {OrderPayComponent} from "../component/order/users/order-pay/order-pay.component";

const routes: Routes = [
  {
    path: "management/order",
    component: TableListOrderComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN', 'ROLE_MANAGEMENT']}
  },
  {path: "cart", component: CartComponent},
  {
    path: "order/pay", component: OrderPayComponent,
    canActivate: [AuthGuard],
    data: {role: 'ROLE_USER'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
