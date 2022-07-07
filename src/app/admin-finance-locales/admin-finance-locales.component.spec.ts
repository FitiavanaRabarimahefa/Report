import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceLocalesComponent } from './admin-finance-locales.component';

describe('AdminFinanceLocalesComponent', () => {
  let component: AdminFinanceLocalesComponent;
  let fixture: ComponentFixture<AdminFinanceLocalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceLocalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
