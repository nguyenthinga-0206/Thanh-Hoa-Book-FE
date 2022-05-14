import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableListBookComponent} from "../component/book/management/table-list-book/table-list-book.component";

const routes: Routes = [
  {path: "management/book", component: TableListBookComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
