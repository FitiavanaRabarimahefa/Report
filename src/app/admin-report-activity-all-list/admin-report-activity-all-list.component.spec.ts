import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportActivityAllListComponent } from './admin-report-activity-all-list.component';

describe('AdminReportActivityAllListComponent', () => {
  let component: AdminReportActivityAllListComponent;
  let fixture: ComponentFixture<AdminReportActivityAllListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportActivityAllListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportActivityAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
