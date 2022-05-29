import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user/User";
import {BookDTO} from "../dto/book/BookDTO";
import {ChangePassword} from "../dto/user/ChangePassword";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly URL_USERS = "http://localhost:8080/api/users";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.URL_USERS);
  }

  createManagement(user: User) {
    return this.httpClient.post<boolean>(this.URL_USERS, user);
  }

  updateManagement(user: User) {
    return this.httpClient.put<boolean>(this.URL_USERS, user);
  }

  changePassword(changePassword: ChangePassword) {
    return this.httpClient.put<boolean>(this.URL_USERS + "change-password", changePassword);
  }

  deleteUser(id: number) {
    return this.httpClient.put<boolean>(this.URL_USERS, id);
  }
}
