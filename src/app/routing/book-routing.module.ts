import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableListBookComponent} from "../component/book/management/table-list-book/table-list-book.component";
import {CreateBookComponent} from "../component/book/management/create-book/create-book.component";

const routes: Routes = [
  {path: "management/book", component: TableListBookComponent},
  {path: "management/book/create", component: CreateBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
