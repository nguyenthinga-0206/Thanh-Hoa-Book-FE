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
    this.setFullName(loginResponse.fullName);
    this.setEmail(loginResponse.email);
    this.setUsername(loginResponse.username);
    this.setImage(loginResponse.image);
  }

  public setLocalStorage(loginResponse: LoginResponse) {
    localStorage.setItem("token", loginResponse.jwt);
    localStorage.setItem("role", loginResponse.role);
    localStorage.setItem("fullName", loginResponse.fullName);
    localStorage.setItem("email", loginResponse.email);
    localStorage.setItem("username", loginResponse.username);
    localStorage.setImage(loginResponse.image);
  }

  public assignSessionStorageWithLocalStorage() {
    this.setToken(<string>localStorage.getItem('token'));
    this.setRole(<string>localStorage.getItem('role'));
    this.setFullName(<string>localStorage.getItem('fullName'));
    this.setEmail(<string>localStorage.getItem('email'));
    this.setUsername(<string>localStorage.getItem('username'));
    this.setImage(<string>localStorage.setImage('image'));
  }

  public setRole(role: string) {
    sessionStorage.setItem("role", role);
  }

  public setToken(jwt: string) {
    sessionStorage.setItem("token", jwt);
  }

  public setFullName(fullName: string) {
    sessionStorage.setItem("fullName", fullName);
  }

  public setEmail(email: string) {
    sessionStorage.setItem("email", email);
  }

  public setUsername(username: string) {
    sessionStorage.setItem("username", username);
  }

  public setImage(image: string) {
    sessionStorage.setItem("image", image);
  }

  public getRole() {
    return sessionStorage.getItem("role")
  }

  public getToken() {
    return sessionStorage.getItem("token");
  }

  public getFullName() {
    return sessionStorage.getItem("fullName");
  }

  public getEmail() {
    return sessionStorage.getItem("email");
  }

  public getUsername() {
    return sessionStorage.getItem("username");
  }

  getImage() {
    return sessionStorage.getItem("image");
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
