import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableListBookComponent} from "../component/book/management/table-list-book/table-list-book.component";
import {AuthGuard} from "../guard/auth.guard";

const routes: Routes = [
  {path: "management/book", component: TableListBookComponent, canActivate: [AuthGuard], data: {role: ['ROLE_ADMIN', 'ROLE_MANAGEMENT']}}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
