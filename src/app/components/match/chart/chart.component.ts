import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class MatchChartComponent {
  public chartOptions: ChartOptions;
  @ViewChild("chart")
  chart!: ChartComponent;  

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "home-team",
          data: [31, 40, 28, 51, 42, 109,3]
        },
        {
          name: "away-team",
          data: [11, 32, 45, 32, 34, 52,100]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        // type: "numeric",
        // // categories: [
        // //   "2018-09-19T00:00:00.000Z",
        // //   "2018-09-19T01:30:00.000Z",
        // //   "2018-09-19T02:30:00.000Z",
        // //   "2018-09-19T03:30:00.000Z",
        // //   "2018-09-19T04:30:00.000Z",
        // //   "2018-09-19T05:30:00.000Z",
        // //   "2018-09-19T06:30:00.000Z"
        // // ]
        // categories: [
        //   0,15,30,45,60,75,90
        // ]

        type: 'category',
        categories: [0,15,30,45,60,75,90],
        tickAmount: 10,
        tickPlacement: 'between',
        min: 12,
        max: 22,
        range: 10,
        floating: false,
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
      }
    };
  }

  public generateData(baseval:any, count:number, yrange:any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
