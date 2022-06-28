import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-locales',
  templateUrl: './finance-locales.component.html',
  styleUrls: ['./finance-locales.component.css']
})
export class FinanceLocalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  selectedcirfin: string = '';
  selectedMonth: string = '';

  cirfinValue(event: any) {
    this.selectedcirfin = event.target.value;
    //this.addReport.cirfinValue=this.selectedcirfin;
    console.log(this.selectedcirfin)
  }

  monthValue(event: any) {
    this.selectedMonth = event.target.value;
    //this.addReport.mois=this.selectedMonth;
    console.log(this.selectedMonth)

  }
}
