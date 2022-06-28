import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-execution-budgetaire',
  templateUrl: './execution-budgetaire.component.html',
  styleUrls: ['./execution-budgetaire.component.css']
})
export class ExecutionBudgetaireComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
selectedcirfin:string='';
selectedMonth:string='';

  cirfinValue(event:any){
  this.selectedcirfin=event.target.value;
  //this.addReport.cirfinValue=this.selectedcirfin;
  console.log(this.selectedcirfin)
}

monthValue(event:any){
  this.selectedMonth=event.target.value;
  //this.addReport.mois=this.selectedMonth;
  console.log(this.selectedMonth)
}

}
