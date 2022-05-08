import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly URL_USERS = "http://localhost:8080/api/users";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.URL_USERS);
  }
}
