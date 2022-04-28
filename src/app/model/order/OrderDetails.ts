import {Book} from "../book/Book";
import {Orders} from "./Orders";

export interface OrderDetails {
  id: number,
  quantity: number,
  book: Book,
  orders: Orders
}
