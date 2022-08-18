import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterReportActivityComponent } from './inter-report-activity.component';

describe('InterReportActivityComponent', () => {
  let component: InterReportActivityComponent;
  let fixture: ComponentFixture<InterReportActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterReportActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterReportActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
