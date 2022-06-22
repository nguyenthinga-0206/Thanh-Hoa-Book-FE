import {Component, Input, OnInit} from '@angular/core';
import {OrdersService} from "../../../../service/orders.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Book} from "../../../../model/book/Book";
import {Cart} from "../../../../model/order/Cart";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../../../service/book.service";
import {CartDTO} from "../../../../dto/order/CartDTO";
import {CartCheckout} from "../../../../dto/order/CartCheckout";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartList!: Array<Cart>;
  cartCheckout!: CartCheckout;
  book!: Book;
  cart!: Cart;
  total: number = 0;
  quantity: number = 1;
  priceShip: number = 0;
  totalPrice: number = 0;

  constructor(private ordersService: OrdersService,
              private bookService: BookService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.params["id"];
    this.bookService.getBookById(id).subscribe(data => {
      this.book = data;
    });
    if (id != null) {
      console.log('mua hang')
    } else {
      this.ordersService.getAllCart().subscribe(data => {
        this.cartList = data.cartList;
        this.total = data.total;
        if (data.total < 300000) {
          this.priceShip = 30000
        }
        this.totalPrice = data.total + this.priceShip;
      });
    }
  }

  checkouForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0][0-9]{9}$")]),
    address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    ship: new FormControl(''),
    detailsList: new FormGroup({})
  });

  order() {
    if (!this.checkouForm.invalid) {
      this.checkouForm.value.ship = this.priceShip;
      this.checkouForm.value.detailsList = this.cartList;
      this.ordersService.createOrder(this.checkouForm.value).subscribe(data => {
          for (let i = 0; i < this.cartList.length; i++) {
            this.ordersService.deleteCartById(this.cartList[i].id).subscribe();
          }
          this.snackBar.open("Đơn hàng đã được thêm thành công.", "Đóng", {
            duration: 3000
          });
          this.router.navigate(['']);
        },
        error => {
          if (error.status = 400) {
            this.router.navigate(['/cart']);
            this.snackBar.open("Sản phẩm bạn chọn đã hết hàng vui lòng chọn sản phẩm khác.", "Đóng", {
              duration: 3000
            });
          }
        }
      );
    }
  }
}
