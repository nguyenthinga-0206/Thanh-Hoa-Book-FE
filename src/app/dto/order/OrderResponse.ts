import {Orders} from "../../model/order/Orders";

export interface OrderResponse {
  orders: Orders;
  totalPrice: number
}
