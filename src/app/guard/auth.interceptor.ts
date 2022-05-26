import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get("No-Auth") === "True") {
      return next.handle(request.clone());
    } else {
      request = AuthInterceptor.addToken(request, this.authService.getToken());
      return next.handle(request).pipe(
        catchError(
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.router.navigate(['/']);
            } else if (error.status == 403) {
              this.router.navigate(['/forbidden'])
            }
            return throwError("Some thing is wrong");
          }
        )
      );
    }
  }

  private static addToken(request: HttpRequest<any>, token: string | null) {
    return request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
