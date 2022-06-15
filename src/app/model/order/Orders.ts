import {OrderDetails} from "./OrderDetails";
import {Account} from "../user/Account";
import {EStatus} from "./EStatus";
import DateTimeFormat = Intl.DateTimeFormat;

export interface Orders {
  id: number,
  code: string,
  fullName: string,
  phone: string,
  address: string,
  ship: number,
  orderDetailsList: Array<OrderDetails>,
  status: EStatus,
  userCreateFlag: string
  timeCreateFlag: Date
}
