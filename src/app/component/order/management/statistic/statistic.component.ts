import {Component, OnInit} from '@angular/core';
import {TopBookResponse} from "../../../../dto/statistic/TopBookResponse";
import {StatisticService} from "../../../../service/statistic.service";

@Component({
  selector: 'app-statistic-revenue',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  topBook: TopBookResponse[] = [];

  constructor(private statisticService: StatisticService) {
  }

  ngOnInit(): void {
    this.statisticService.getTopBook().subscribe(data => {
      this.topBook = data;
    })
  }

}
