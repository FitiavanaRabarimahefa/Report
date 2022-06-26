import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRGPComponent } from './crgp.component';

describe('CRGPComponent', () => {
  let component: CRGPComponent;
  let fixture: ComponentFixture<CRGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRGPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
