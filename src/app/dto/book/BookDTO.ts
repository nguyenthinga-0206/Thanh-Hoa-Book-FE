import {ELanguage} from "../../model/book/ELanguage";
import {ECover} from "../../model/book/ECover";
import {Image} from "../../model/book/Image";
import {Author} from "../../model/book/Author";
import {Producer} from "../../model/book/Producer";
import {Category} from "../../model/book/Category";

export interface BookDTO {
  id: number,
  name: string,
  code: string,
  yearPublishing: number,
  quantity: number,
  weight: number,
  width: number,
  lenght: number,
  height: number,
  pageNumber: number,
  language: ELanguage,
  formCover: ECover,
  price: number,
  description: string,
  imageList: Array<Image>,
  authorList: Array<Author>,
  producer: Producer,
  categoryList: Array<Category>,
}
