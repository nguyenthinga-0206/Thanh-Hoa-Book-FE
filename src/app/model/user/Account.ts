import {ERole} from "./ERole";
import {User} from "./User";
import {Orders} from "../order/Orders";

export interface Account {
  username: string,
  password: string,
  role: ERole
  user: User,
  orderList: Array<Orders>
}
