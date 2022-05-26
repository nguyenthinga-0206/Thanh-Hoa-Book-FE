import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {LoginResponse} from "../dto/login/LoginResponse";
import {Observable} from "rxjs";
import {LoginRequest} from "../dto/login/LoginRequest";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly URL_LOGIN = "http://localhost:8080/api/login";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.URL_LOGIN, loginRequest, {headers: this.requestHeader});
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
