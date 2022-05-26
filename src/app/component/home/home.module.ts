import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from '../../routing/home-routing.module';
import {FooterComponent} from './management/footer/footer.component';
import {HeaderComponent} from './management/header/header.component';
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    ForbiddenComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatSidenavModule
    ]
})
export class HomeModule {
}
