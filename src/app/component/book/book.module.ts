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
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    CreateBookComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    TableListBookComponent,
    ListBookComponent,
    AddDetailBookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ]
})
export class BookModule {
}
