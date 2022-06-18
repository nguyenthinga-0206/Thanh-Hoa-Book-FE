import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookRoutingModule} from '../../routing/book-routing.module';
import {CreateBookComponent} from './management/create-book/create-book.component';
import {UpdateBookComponent} from './management/update-book/update-book.component';
import {DeleteBookComponent} from './management/delete-book/delete-book.component';
import {TableListBookComponent} from './management/table-list-book/table-list-book.component';
import {ListBookComponent} from './users/list-book/list-book.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {AddDetailBookComponent} from './management/add-detail-book/add-detail-book.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CreateCategoryComponent} from './management/create-category/create-category.component';
import {CreateAuthorComponent} from './management/create-author/create-author.component';
import {CreateProducerComponent} from './management/create-producer/create-producer.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {environment} from "../../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MatCardModule} from "@angular/material/card";
import {BookDetailComponent} from './users/book-detail/book-detail.component';
import { DetailBookComponent } from './management/detail-book/detail-book.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {OrderModule} from "ngx-order-pipe";

@NgModule({
  declarations: [
    CreateBookComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    TableListBookComponent,
    ListBookComponent,
    AddDetailBookComponent,
    CreateCategoryComponent,
    CreateAuthorComponent,
    CreateProducerComponent,
    BookDetailComponent,
    DetailBookComponent,
  ],
  exports: [
    ListBookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    Ng2SearchPipeModule,
    OrderModule
  ]
})
export class BookModule {
}
