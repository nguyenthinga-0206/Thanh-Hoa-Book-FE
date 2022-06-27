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

  cartList: Cart[] = [];
  book!: Book;
  cart!: Cart;
  total: number = 0;
  quantity: number;
  priceShip: number = 0;
  totalPrice: number = 0;
  submitting: boolean = false;

  constructor(private ordersService: OrdersService,
              private bookService: BookService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.book = this.router.getCurrentNavigation()?.extras.state?.book;
    this.quantity = this.router.getCurrentNavigation()?.extras.state?.quantity;
  }

  ngOnInit(): void {
    if (this.book != null) {
      this.cartList.push({id: 0, quantity: this.quantity, book: this.book});
      this.total = this.book.price * this.quantity;
      if (this.total < 300000) {
        this.priceShip = 30000;
      }
      this.totalPrice = this.total + this.priceShip;
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
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0][0-9]{9}$")]),
    address: new FormControl('', [Validators.required]),
    ship: new FormControl(''),
    detailsList: new FormGroup({})
  });

  order() {
    this.submitting = true;
    if (!this.checkouForm.invalid) {
      this.checkouForm.value.ship = this.priceShip;
      this.checkouForm.value.detailsList = this.cartList;
      this.ordersService.createOrder(this.checkouForm.value).subscribe(data => {
          for (let i = 0; i < this.cartList.length; i++) {
            this.ordersService.deleteCartById(this.cartList[i].id).subscribe();
          }
          this.snackBar.open("Đơn hàng đã được thêm thành công.", "Đóng", {
            panelClass: ['mat-toolbar', 'mat-primary'],
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
