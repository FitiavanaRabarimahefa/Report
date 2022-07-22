import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterExecutionBudgetaireComponent } from './inter-execution-budgetaire.component';

describe('InterExecutionBudgetaireComponent', () => {
  let component: InterExecutionBudgetaireComponent;
  let fixture: ComponentFixture<InterExecutionBudgetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterExecutionBudgetaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterExecutionBudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
