import {Account} from "../../model/user/Account";
import {EGender} from "../../model/user/EGender";

export interface ProfileRequest {
  id: number,
  account: Account,
  fullName: string,
  birthday: Date,
  email: string,
  gender: EGender,
  image: string
}
