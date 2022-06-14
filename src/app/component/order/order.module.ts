import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from '../../routing/order-routing.module';
import {TableListOrderComponent} from './management/table-list-order/table-list-order.component';
import {NgxPaginationModule} from "ngx-pagination";
import {OrderDetailsComponent} from './management/order-details/order-details.component';
import {OrderStatusComponent} from './management/order-status/order-status.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {CartComponent} from './users/cart/cart.component';
import {CheckoutComponent} from './users/checkout/checkout.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {BookModule} from "../book/book.module";


@NgModule({
  declarations: [
    TableListOrderComponent,
    OrderDetailsComponent,
    OrderStatusComponent,
    CartComponent,
    CheckoutComponent
  ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        NgxPaginationModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatCardModule,
        BookModule
    ]
})
export class OrderModule {
}
