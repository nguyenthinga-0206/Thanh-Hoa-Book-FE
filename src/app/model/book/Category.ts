import {Book} from "./Book";

export interface Category {
  id: number,
  name: string,
  bookList: Array<Book>
}
