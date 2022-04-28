import {Book} from "./Book";

export interface Image {
  id: number,
  name: string,
  path: string,
  book: Book
}
