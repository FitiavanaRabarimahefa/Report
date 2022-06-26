import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardReportComponent } from './admin-dashboard-report.component';

describe('AdminDashboardReportComponent', () => {
  let component: AdminDashboardReportComponent;
  let fixture: ComponentFixture<AdminDashboardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
