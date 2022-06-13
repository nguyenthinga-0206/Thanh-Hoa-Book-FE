import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book/Book";
import {BookDTO} from "../dto/book/BookDTO";
import {AddBookDTO} from "../dto/book/AddBookDTO";
import {Producer} from "../model/book/Producer";
import {Category} from "../model/book/Category";
import {Author} from "../model/book/Author";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  readonly URL_BOOK = "http://localhost:8080/api/book";
  readonly URL_PRODUCER = "http://localhost:8080/api/producer";
  readonly URL_AUTHOR = "http://localhost:8080/api/author";
  readonly URL_CATEGORY = "http://localhost:8080/api/category";

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.JWT
  });

  getAll(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Book>>(this.URL_BOOK);
  }

  getAllProducer(): Observable<Array<Producer>> {
    return this.httpClient.get<Array<Producer>>(this.URL_PRODUCER);
  }

  getAllAuthor(): Observable<Array<Author>> {
    return this.httpClient.get<Array<Author>>(this.URL_AUTHOR);
  }

  getAllCategory(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(this.URL_CATEGORY);
  }

  createBook(bookDTO: BookDTO) {
    return this.httpClient.post<boolean>(this.URL_BOOK, bookDTO, {headers: this.headers});
  }

  addBookById(addBookDTO: AddBookDTO): Observable<boolean> {
    return this.httpClient.put<boolean>(this.URL_BOOK + "/add-book", addBookDTO, {headers: this.headers});
  }

  createCategory(category: Category) {
    return this.httpClient.post<boolean>(this.URL_CATEGORY, category, {headers: this.headers});
  }

  createAuthor(author: Author) {
    return this.httpClient.post<boolean>(this.URL_AUTHOR, author, {headers: this.headers});
  }

  createProducer(producer: Producer) {
    return this.httpClient.post<boolean>(this.URL_PRODUCER, producer, {headers: this.headers});
  }

  editBook(bookDTO: BookDTO) {
    return this.httpClient.put<boolean>(this.URL_BOOK, bookDTO, {headers: this.headers});
  }

  getBookById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(this.URL_BOOK + "/" + id)
  }

  deleteBookById(id: number) {
    return this.httpClient.delete(this.URL_BOOK + "?id=" + id, {headers: this.headers})
  }
}
