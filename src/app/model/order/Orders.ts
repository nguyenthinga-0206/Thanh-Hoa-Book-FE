import {OrderDetails} from "./OrderDetails";
import {TimeStatus} from "./TimeStatus";
import {Account} from "../user/Account";

export interface Orders {
  id: number,
  code: string,
  fullName: string,
  phone: string,
  address: string,
  orderDetails: Array<OrderDetails>,
  timeStatus: Array<TimeStatus>,
  account: Account
}
