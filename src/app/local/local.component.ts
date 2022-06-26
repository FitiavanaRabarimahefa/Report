import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
visibilityReport='none';
visibilityTwo='none';
visibilityAllReport = 'block';

ShowReport(){
  this.visibilityReport = 'block';
  this.visibilityAllReport = 'none';
  this.visibilityTwo='none'
}
ShowLogin(){
  this.visibilityTwo='block';
  this.visibilityReport = 'none'
  this.visibilityAllReport = 'none';
}

  ShowAllReport() {
    this.visibilityAllReport = 'block';
    this.visibilityTwo = 'none';
    this.visibilityReport = 'none';
}



}
