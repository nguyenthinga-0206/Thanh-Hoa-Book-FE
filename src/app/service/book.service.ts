import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  constructor(private httpClient: HttpClient) {
  }

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
