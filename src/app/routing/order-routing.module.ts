import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableListOrderComponent} from "../component/order/management/table-list-order/table-list-order.component";

const routes: Routes = [
  {path: "management/order", component: TableListOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
