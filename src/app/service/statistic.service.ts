import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {TopBookResponse} from "../dto/statistic/TopBookResponse";
import {StatisticResponse} from "../dto/statistic/StatisticResponse";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  // readonly URL_STATISTIC = "http://localhost:8080/api/statistic";
  readonly URL_STATISTIC= "https://api-thanh-hoa-book.herokuapp.com/api/statistic";

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.JWT
  });

  getTopBook(): Observable<Array<TopBookResponse>> {
    return this.httpClient.get<Array<TopBookResponse>>(this.URL_STATISTIC + "/statistic-top", {headers: this.headers});
  }

  getStatisticByMonth(year: number): Observable<Array<StatisticResponse>> {
    return this.httpClient.get<Array<StatisticResponse>>(this.URL_STATISTIC + "/statistic-by-month?year=" + year, {headers: this.headers});
  }

  getStatisticByQuaterly(year: number): Observable<Array<StatisticResponse>> {
    return this.httpClient.get<Array<StatisticResponse>>(this.URL_STATISTIC + "/statistic-by-quaterly?year=" + year, {headers: this.headers});
  }

  getStatisticByYear(): Observable<Array<StatisticResponse>> {
    return this.httpClient.get<Array<StatisticResponse>>(this.URL_STATISTIC + "/statistic-by-year", {headers: this.headers});
  }
}
