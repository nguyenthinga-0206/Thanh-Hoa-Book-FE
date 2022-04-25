import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from "./component/home/home.module";
import {UserModule} from "./component/user/user.module";
import {BookModule} from "./component/book/book.module";
import {OrderModule} from "./component/order/order.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    UserModule,
    BookModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
