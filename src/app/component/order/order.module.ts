import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from '../../routing/order-routing.module';
import { TableListOrderComponent } from './management/table-list-order/table-list-order.component';


@NgModule({
  declarations: [
    TableListOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
