import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportActivityAllListComponent } from './report-activity-all-list.component';

describe('ReportActivityAllListComponent', () => {
  let component: ReportActivityAllListComponent;
  let fixture: ComponentFixture<ReportActivityAllListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportActivityAllListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportActivityAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
