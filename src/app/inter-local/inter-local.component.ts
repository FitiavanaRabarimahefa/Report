import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inter-local',
  templateUrl: './inter-local.component.html',
  styleUrls: ['./inter-local.component.css']
})
export class InterLocalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  VisibleReportActivity = "block"
  VisibleReportList = "none"

  ShowAllReportActivity() {
    this.VisibleReportList = "none"
    this.VisibleReportActivity = "block"

   }

  ShowUpdateSRB() {
    this.VisibleReportList = "block";
    this.VisibleReportActivity = "none";
  }


}
