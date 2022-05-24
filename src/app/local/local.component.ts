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

ShowReport(){
  this.visibilityReport='block';
}
ShowLogin(){
  this.visibilityTwo='block';
  this.visibilityReport='none'
}
}
