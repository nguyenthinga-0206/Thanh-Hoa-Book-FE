import {ERole} from "../../model/user/ERole";
import {Account} from "../../model/user/Account";

export interface RegisterRequest {
  username: string,
  password: string,
  role: ERole,
  email: string
}
