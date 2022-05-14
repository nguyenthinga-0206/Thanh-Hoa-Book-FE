import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book/Book";
import {BookDTO} from "../dto/book/BookDTO";
import {AddBookDTO} from "../dto/book/AddBookDTO";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  readonly URL_BOOK = "http://localhost:8080/api/book";

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Book>>(this.URL_BOOK);
  }

  createBook(bookDTO: BookDTO) {
    return this.httpClient.post<boolean>(this.URL_BOOK, bookDTO);
  }

  addBookById(addBookDTO: AddBookDTO): Observable<boolean> {
    return this.httpClient.put<boolean>(this.URL_BOOK + "/add-book", addBookDTO);
  }

  editBook(bookDTO: BookDTO) {
    return this.httpClient.put<boolean>(this.URL_BOOK, bookDTO);
  }

  getBookById(id: number) {
    return this.httpClient.get(this.URL_BOOK + "/" + id)
  }

  deleteBookById(id: number) {
    return this.httpClient.delete(this.URL_BOOK + "?id=" + id)
  }
}
