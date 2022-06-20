import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMensualComponent } from './report-mensual.component';

describe('ReportMensualComponent', () => {
  let component: ReportMensualComponent;
  let fixture: ComponentFixture<ReportMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMensualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
