import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionBudgetaireComponent } from './execution-budgetaire.component';

describe('ExecutionBudgetaireComponent', () => {
  let component: ExecutionBudgetaireComponent;
  let fixture: ComponentFixture<ExecutionBudgetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionBudgetaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionBudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
