import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfBAAFComponent } from './pdf-baaf.component';

describe('PdfBAAFComponent', () => {
  let component: PdfBAAFComponent;
  let fixture: ComponentFixture<PdfBAAFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfBAAFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfBAAFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
