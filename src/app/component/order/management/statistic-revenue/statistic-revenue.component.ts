import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../../../../service/statistic.service";
import {StatisticResponse} from "../../../../dto/statistic/StatisticResponse";

@Component({
  selector: 'app-statistic-revenue',
  templateUrl: './statistic-revenue.component.html',
  styleUrls: ['./statistic-revenue.component.css']
})
export class StatisticRevenueComponent implements OnInit {

  statisticByMonth: StatisticResponse[] = [];
  statisticByQuaterly: StatisticResponse[] = [];
  statisticByYear: StatisticResponse[] = [];
  yearList: number[] = [2022, 2021, 2020, 2019, 2018];
  year: number = 2022;

  constructor(private statisticService: StatisticService) {
  }

  ngOnInit(): void {
    this.statisticService.getStatisticByMonth(this.year).subscribe(data => {
      this.statisticByMonth = data;
    });
    this.statisticService.getStatisticByQuaterly(this.year).subscribe(data => {
      this.statisticByQuaterly = data;
    });
    this.statisticService.getStatisticByYear().subscribe(data => {
      this.statisticByYear = data;
    });
  }

  getByMonth(year: string) {
    this.year = Number(year);
    this.statisticService.getStatisticByMonth(this.year).subscribe(data => {
      this.statisticByMonth = data;
    });
  }

  getByQuaterly(year: string){
    this.year = Number(year);
    this.statisticService.getStatisticByQuaterly(this.year).subscribe(data => {
      this.statisticByQuaterly = data;
    });
  }

}
