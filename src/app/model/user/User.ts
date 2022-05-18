import {EGender} from "./EGender";
import {Account} from "./Account";

export interface User {
  id: number,
  fullName: string,
  birthday?: Date,
  email: string,
  phone?: string,
  gender: EGender,
  image?: string,
  account: Account
}
