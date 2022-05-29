import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableListBookComponent} from "../component/book/management/table-list-book/table-list-book.component";
import {AuthGuard} from "../guard/auth.guard";
import {ListBookComponent} from "../component/book/users/list-book/list-book.component";

const routes: Routes = [
  {
    path: "management/book",
    component: TableListBookComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN', 'ROLE_MANAGEMENT']}
  },
  {
    path: "", component: ListBookComponent
  },
  {
    path: "book/:id", component: ListBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
