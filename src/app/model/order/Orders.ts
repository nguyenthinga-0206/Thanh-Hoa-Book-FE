import {OrderDetails} from "./OrderDetails";
import {Account} from "../user/Account";
import {EStatus} from "./EStatus";

export interface Orders {
  id: number,
  code: string,
  fullName: string,
  phone: string,
  address: string,
  orderDetails: Array<OrderDetails>,
  status: EStatus,
  account: Account
}
