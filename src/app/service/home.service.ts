import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {LoginResponse} from "../dto/login/LoginResponse";
import {Observable} from "rxjs";
import {LoginRequest} from "../dto/login/LoginRequest";
import {RegisterRequest} from "../dto/user/registerRequest";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // readonly URL_HOME = "http://localhost:8080/api/";
  readonly URL_HOME = "https://api-thanh-hoa-book.herokuapp.com/api/";

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.URL_HOME + "login", loginRequest);
  }

  public register(registerRequest: RegisterRequest): Observable<boolean> {
    return this.httpClient.post<boolean>(this.URL_HOME + "register", registerRequest)
  }

  public roleMatch(allowedRole: string[]): boolean {
    let isMatch = true;
    const role = this.authService.getRole();

    if (role !== null) {
      for (let i = 0; i < allowedRole.length; i++) {
        if (role == allowedRole[i]) {
          return true;
        } else {
          isMatch = false;
        }
      }
    }
    return isMatch;
  }
}
