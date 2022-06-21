import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../../../service/book.service";
import {Book} from "../../../../model/book/Book";
import {CartRequest} from "../../../../dto/order/CartRequest";
import {OrdersService} from "../../../../service/orders.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavbarComponent} from "../../../home/users/navbar/navbar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../service/auth.service";
import {Producer} from "../../../../model/book/Producer";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  bookList!: Array<Book>;
  producerList!: Array<Producer>;
  p: number | any;
  cartRequest!: CartRequest;
  searchError: string = '';
  search: string = '';
  order: string = 'price';
  reverse: boolean = false;
  caseInsensitive: boolean = false; //khong phan biet hoa thuong caseInsensitive = true, phân biet hoa thuong caseInsensitive =  false

  constructor(private authService: AuthService,
              private bookService: BookService,
              private ordersService: OrdersService,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    var categoryId = this.activatedRoute.snapshot.params["id"];
    var searchName = this.activatedRoute.snapshot.params["name"];
    this.bookService.getAllProducer().subscribe(data => {
      this.producerList = data;
    });
    if (searchName != undefined) {
      this.search = searchName;
      this.bookService.getBookByName(searchName).subscribe(data => {
          this.bookList = data;
          this.p = 1;
        },
        error => {
          this.searchError = 'Không có kết quả tìm kiếm'
        }
      );
    } else if (categoryId != null) {
      this.bookService.getBookByCategory(categoryId).subscribe(data => {
          this.search = data[0].categoryList[0].name;
          this.bookList = data;
          this.p = 1;
        },
        error => {
          this.searchError = 'Không có kết quả tìm kiếm'
        }
      );
    } else {
      this.bookService.getAll().subscribe(data => {
          this.bookList = data;
          this.p = 1;
        },
      );
    }
  }

  setOrderLow(value: string) {
    if (this.order === value) {
      this.reverse = false;
    }
    this.order = value;
  }

  setOrderHigh(value: string) {
    if (this.order === value) {
      this.reverse = true;
    }
    this.order = value;
  }

  addCart(id: number) {
    if (this.authService.getRole() == 'ROLE_USER') {
      this.cartRequest = {
        id: id,
        quantity: 1
      };
      this.ordersService.addCart(this.cartRequest).subscribe(data => {
        this.snackBar.open("Sản phẩm đã được thêm vào giỏ hàng", "OK", {
          duration: 3000
        });
        window.location.reload();
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  detail(id: number) {
    this.router.navigate(['/book', id]);
  }

}
