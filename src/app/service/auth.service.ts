import {Injectable} from '@angular/core';
import {LoginResponse} from "../dto/login/LoginResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  public setSessionStorage(loginResponse: LoginResponse) {
    this.setToken(loginResponse.jwt);
    this.setRole(loginResponse.role);
    this.setEmail(loginResponse.email);
    this.setUsername(loginResponse.username);
  }

  public setLocalStorage(loginResponse: LoginResponse) {
    localStorage.setItem("token", loginResponse.jwt);
    localStorage.setItem("role", loginResponse.role);
    localStorage.setItem("email", loginResponse.email);
    localStorage.setItem("username", loginResponse.username);
  }

  public assignSessionStorageWithLocalStorage() {
    this.setToken(<string>localStorage.getItem('token'));
    this.setRole(<string>localStorage.getItem('role'));
    this.setEmail(<string>localStorage.getItem('email'));
    this.setUsername(<string>localStorage.getItem('username'));
  }

  public setRole(role: string) {
    sessionStorage.setItem("role", role);
  }

  public setToken(jwt: string) {
    sessionStorage.setItem("token", jwt);
  }


  public setEmail(email: string) {
    sessionStorage.setItem("email", email);
  }

  public setUsername(username: string) {
    sessionStorage.setItem("username", username);
  }


  public getRole() {
    return sessionStorage.getItem("role")
  }

  public getToken() {
    return sessionStorage.getItem("token");
  }


  public getEmail() {
    return sessionStorage.getItem("email");
  }

  public getUsername() {
    return sessionStorage.getItem("username");
  }

  public clear() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl("/");
  }

  public isLoggedIn() {
    return this.getRole() && this.getToken();
  }
}
