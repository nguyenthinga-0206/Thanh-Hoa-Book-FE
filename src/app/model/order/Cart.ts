import {Book} from "../book/Book";

export interface Cart {
  id: number,
  book: Book,
  quantity: number
}
