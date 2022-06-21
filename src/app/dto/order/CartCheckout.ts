import {Book} from "../../model/book/Book";

export interface CartCheckout {
  book: Book,
  quantity: number,
}
