import {Account} from "../../model/user/Account";
import {OrderDetails} from "../../model/order/OrderDetails";

export interface OrdersRequest {
  fullName: string,
  phone: string,
  address: string,
  ship: number,
  detailsList: OrderDetails
}
