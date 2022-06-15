import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user/User";
import {BookDTO} from "../dto/book/BookDTO";
import {ChangePassword} from "../dto/user/ChangePassword";
import {AuthService} from "./auth.service";
import {ProfileRequest} from "../dto/user/profileRequest";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly URL_USERS = "http://localhost:8080/api/users/";

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.JWT
  });

  getAll(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.URL_USERS, {headers: this.headers});
  }

  getProfile(email: string): Observable<User> {
    return this.httpClient.get<User>(this.URL_USERS + "profile?email=" + email);
  }

  createManagement(user: User): Observable<boolean> {
    return this.httpClient.post<boolean>(this.URL_USERS, user, {headers: this.headers});
  }

  updateManagement(user: User): Observable<boolean> {
    return this.httpClient.put<boolean>(this.URL_USERS, user, {headers: this.headers});
  }

  updateProfile(profile: ProfileRequest): Observable<boolean> {
    return this.httpClient.put<boolean>(this.URL_USERS + "profile", profile, {headers: this.headers});
  }

  changePassword(changePassword: ChangePassword) {
    return this.httpClient.put<boolean>(this.URL_USERS + "change-password", changePassword);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.httpClient.put<boolean>(this.URL_USERS, id, {headers: this.headers});
  }
}
