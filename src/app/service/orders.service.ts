import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orders} from "../model/order/Orders";
import {OrderDetails} from "../model/order/OrderDetails";
import {StatusDTO} from "../dto/order/StatusDTO";
import {CartRequest} from "../dto/order/CartRequest";
import {CartDTO} from "../dto/order/CartDTO";
import {AuthService} from "./auth.service";
import {OrdersRequest} from "../dto/order/ordersRequest";
import {OrderResponse} from "../dto/order/OrderResponse";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // readonly URL_ORDERS = "http://localhost:8080/api/orders";
  // readonly URL_CARTS = "http://localhost:8080/api/cart";
  readonly URL_ORDERS = "https://api-thanh-hoa-book.herokuapp.com/api/orders";
  readonly URL_CARTS = "https://api-thanh-hoa-book.herokuapp.com/api/cart";

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.JWT
  });

  getAll(): Observable<Array<Orders>> {
    return this.httpClient.get<Array<Orders>>(this.URL_ORDERS, {headers: this.headers});
  }

  getAllCart(): Observable<CartDTO> {
    return this.httpClient.get<CartDTO>(this.URL_CARTS, {headers: this.headers});
  }

  getById(id: number): Observable<Orders> {
    return this.httpClient.get<Orders>(this.URL_ORDERS + "/" + id);
  }

  addCart(cartRequest: CartRequest): Observable<CartDTO> {
    return this.httpClient.post<CartDTO>(this.URL_CARTS, cartRequest, {headers: this.headers});
  }

  getOrderDetailsByOrderId(id: number): Observable<Array<OrderDetails>> {
    return this.httpClient.get<Array<OrderDetails>>(this.URL_ORDERS + "/" + id + "/detail");
  }

  getOrderHisory(status: string): Observable<Array<OrderResponse>> {
    return this.httpClient.get<Array<OrderResponse>>(this.URL_ORDERS + "/history?status=" + status, {headers: this.headers});
  }

  createOrder(orderRequest: OrdersRequest): Observable<boolean> {
    return this.httpClient.post<boolean>(this.URL_ORDERS, orderRequest, {headers: this.headers});
  }

  editCart(id: number, quantity: number): Observable<boolean> {
    return this.httpClient.put<boolean>(this.URL_CARTS + "/" + id + "/" + quantity, {headers: this.headers});
  }

  editStatus(statusDTO: StatusDTO): Observable<boolean> {
    return this.httpClient.put<boolean>(this.URL_ORDERS + "/status", statusDTO, {headers: this.headers});
  }

  deleteCartById(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.URL_CARTS + "/" + id, {headers: this.headers})
  }
}
