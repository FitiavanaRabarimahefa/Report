import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfReportMensualComponent } from './pdf-report-mensual.component';

describe('PdfReportMensualComponent', () => {
  let component: PdfReportMensualComponent;
  let fixture: ComponentFixture<PdfReportMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfReportMensualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfReportMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
