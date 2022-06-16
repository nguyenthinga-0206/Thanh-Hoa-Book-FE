import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from "./component/home/home.module";
import {UserModule} from "./component/user/user.module";
import {BookModule} from "./component/book/book.module";
import {OrdersModule} from "./component/order/orders.module";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MatExpansionModule} from "@angular/material/expansion";
import {OrderModule} from "ngx-order-pipe";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    UserModule,
    BookModule,
    OrdersModule,
    NgxPaginationModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatExpansionModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
