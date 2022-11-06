import { Component, OnInit } from '@angular/core';
import {Chart,registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart: any;
  constructor() { }

  ngOnInit(): void {
    this.chart = document.getElementById('test-chart');
    Chart.register(...registerables);
    this.loadChart();
  }

  loadChart(): void{
    new Chart(this.chart, {
      type: 'line',
      data: {

        datasets: [
          {
            data: [10, 2, 30, 40, 50, 0, 70, 80, 90, 100, 10, 0, 39.4, 78, 99, 28, 52, 84, 0, 74, 0, 88],
            backgroundColor:'#cd3036',
            borderColor:'#cd3036'
          },
          {
            data: [20, 2, 50, 70, 90, 0, 10, 8, 90, 100, 10, 0, 9.4, 74, 80, 52, 31, 75, 89, 54,70,45],
            backgroundColor:'#cd307',
            borderColor:'#cd307'
          }
        ],
        labels: [

          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22'
        ]
      }

    })
  }

}
