import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceLocalesComponent } from './finance-locales.component';

describe('FinanceLocalesComponent', () => {
  let component: FinanceLocalesComponent;
  let fixture: ComponentFixture<FinanceLocalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceLocalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
