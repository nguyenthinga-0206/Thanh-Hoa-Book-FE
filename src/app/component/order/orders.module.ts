import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from '../../routing/order-routing.module';
import {TableListOrderComponent} from './management/table-list-order/table-list-order.component';
import {NgxPaginationModule} from "ngx-pagination";
import {OrderDetailsComponent} from './management/order-details/order-details.component';
import {OrderStatusComponent} from './management/order-status/order-status.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {CartComponent} from './users/cart/cart.component';
import {CheckoutComponent} from './users/checkout/checkout.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {BookModule} from "../book/book.module";
import {HistoryOrdersComponent} from './users/history-orders/history-orders.component';
import {MatTabsModule} from "@angular/material/tabs";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {OrderModule} from "ngx-order-pipe";
import {StatisticComponent} from './management/statistic/statistic.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    TableListOrderComponent,
    OrderDetailsComponent,
    OrderStatusComponent,
    CartComponent,
    CheckoutComponent,
    HistoryOrdersComponent,
    StatisticComponent
  ],
  exports: [
    HistoryOrdersComponent
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
    BookModule,
    MatTabsModule,
    Ng2SearchPipeModule,
    OrderModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ]
})
export class OrdersModule {
}
