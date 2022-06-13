import {ELanguage} from "./ELanguage";
import {ECover} from "./ECover";
import {Image} from "./Image";
import {Author} from "./Author";
import {Producer} from "./Producer";
import {Category} from "./Category";
import {OrderDetails} from "../order/OrderDetails";
import {Cart} from "../order/Cart";

export interface Book {
  id: number,
  name: string,
  code: string,
  yearPublishing: number,
  quantity: number,
  weight: number,
  width: number,
  lenght: number,
  height: number,
  pageNumber: number,
  language: ELanguage,
  formCover: ECover,
  price: number,
  description: string,
  imageList: Array<Image>,
  authorList: Array<Author>,
  producer: Producer,
  categoryList: Array<Category>,
  cartList: Array<Cart>,
  orderDetailsList: Array<OrderDetails>
}
