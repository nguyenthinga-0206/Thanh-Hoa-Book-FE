import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from '../../routing/book-routing.module';
import { CreateBookComponent } from './management/create-book/create-book.component';
import { UpdateBookComponent } from './management/update-book/update-book.component';
import { DeleteBookComponent } from './management/delete-book/delete-book.component';
import { TableListBookComponent } from './management/table-list-book/table-list-book.component';
import { ListBookComponent } from './users/list-book/list-book.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateBookComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    TableListBookComponent,
    ListBookComponent
  ],
    imports: [
        CommonModule,
        BookRoutingModule,
        FormsModule
    ]
})
export class BookModule { }
