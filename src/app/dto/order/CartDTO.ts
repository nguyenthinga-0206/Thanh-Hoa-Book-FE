import {Cart} from "../../model/order/Cart";

export interface CartDTO {
  cartList: Array<Cart>
  total: number;
}
