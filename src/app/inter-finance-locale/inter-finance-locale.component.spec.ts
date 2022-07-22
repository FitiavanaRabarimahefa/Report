import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterFinanceLocaleComponent } from './inter-finance-locale.component';

describe('InterFinanceLocaleComponent', () => {
  let component: InterFinanceLocaleComponent;
  let fixture: ComponentFixture<InterFinanceLocaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterFinanceLocaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterFinanceLocaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
