import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patrimoine-etat',
  templateUrl: './patrimoine-etat.component.html',
  styleUrls: ['./patrimoine-etat.component.css']
})
export class PatrimoineEtatComponent implements OnInit {

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
