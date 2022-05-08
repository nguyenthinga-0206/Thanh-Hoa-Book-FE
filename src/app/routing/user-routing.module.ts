import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableListUserComponent} from "../component/user/management/table-list-user/table-list-user.component";

const routes: Routes = [
  {path: "management/user", component: TableListUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
