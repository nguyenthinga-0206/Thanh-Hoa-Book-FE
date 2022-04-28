import {Book} from "./Book";

export interface Author {
  id: number,
  name: string,
  bookList: Array<Book>
}
