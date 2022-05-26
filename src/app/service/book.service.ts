import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book/Book";
import {BookDTO} from "../dto/book/BookDTO";
import {AddBookDTO} from "../dto/book/AddBookDTO";
import {Producer} from "../model/book/Producer";
import {Category} from "../model/book/Category";
import {Author} from "../model/book/Author";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  readonly URL_BOOK = "http://localhost:8080/api/book";
  readonly URL_PRODUCER = "http://localhost:8080/api/producer";
  readonly URL_AUTHOR = "http://localhost:8080/api/author";
  readonly URL_CATEGORY = "http://localhost:8080/api/category";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Book>>(this.URL_BOOK, {headers: this.requestHeader});
  }

  getAllProducer(): Observable<Array<Producer>> {
    return this.httpClient.get<Array<Producer>>(this.URL_PRODUCER, {headers: this.requestHeader});
  }

  getAllAuthor(): Observable<Array<Author>> {
    return this.httpClient.get<Array<Author>>(this.URL_AUTHOR, {headers: this.requestHeader});
  }

  getAllCategory(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(this.URL_CATEGORY, {headers: this.requestHeader});
  }

  createBook(bookDTO: BookDTO) {
    return this.httpClient.post<boolean>(this.URL_BOOK, bookDTO);
  }

  addBookById(addBookDTO: AddBookDTO): Observable<boolean> {
    return this.httpClient.put<boolean>(this.URL_BOOK + "/add-book", addBookDTO);
  }

  createCategory(category: Category) {
    return this.httpClient.post<boolean>(this.URL_CATEGORY, category);
  }

  createAuthor(author: Author) {
    return this.httpClient.post<boolean>(this.URL_AUTHOR, author);
  }

  createProducer(producer: Producer) {
    return this.httpClient.post<boolean>(this.URL_PRODUCER, producer);
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
