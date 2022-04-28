import {Book} from "./Book";

export interface Producer {
  id: number,
  name: string,
  bookList: Array<Book>
}
