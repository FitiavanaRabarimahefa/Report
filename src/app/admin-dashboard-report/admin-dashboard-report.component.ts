import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-report',
  templateUrl: './admin-dashboard-report.component.html',
  styleUrls: ['./admin-dashboard-report.component.css']
})
export class AdminDashboardReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ShowLogin() { }



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
