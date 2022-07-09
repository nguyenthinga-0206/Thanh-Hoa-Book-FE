import {Book} from "../book/Book";
import {Orders} from "./Orders";

export interface OrderDetails {
  id: number,
  quantity: number,
  price: number,
  book: Book,
  orders: Orders
}
