import DateTimeFormat = Intl.DateTimeFormat;
import {EStatus} from "./EStatus";
import {Orders} from "./Orders";

export interface TimeStatus {
  id: number,
  time: DateTimeFormat,
  status: EStatus,
  orders: Orders
}
