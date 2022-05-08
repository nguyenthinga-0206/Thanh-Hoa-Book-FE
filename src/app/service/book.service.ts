import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book/Book";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  readonly URL_BOOK = "http://localhost:8080/api/book";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Book>>(this.URL_BOOK);
  }
}
