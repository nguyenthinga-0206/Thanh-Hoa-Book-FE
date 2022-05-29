import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orders} from "../model/order/Orders";
import {OrderDetails} from "../model/order/OrderDetails";
import {StatusDTO} from "../dto/order/StatusDTO";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  readonly URL_ORDERS = "http://localhost:8080/api/orders";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Array<Orders>> {
    return this.httpClient.get<Array<Orders>>(this.URL_ORDERS);
  }

  getById(id: number): Observable<Orders> {
    return this.httpClient.get<Orders>(this.URL_ORDERS + "/" + id);
  }

  getOrderDetailsByOrderId(id: number): Observable<Array<OrderDetails>> {
    return this.httpClient.get<Array<OrderDetails>>(this.URL_ORDERS + "/" + id + "/detail");
  }

  editStatus(statusDTO: StatusDTO): Observable<boolean> {
    return this.httpClient.put<boolean>(this.URL_ORDERS + "/status", statusDTO);
  }
}
