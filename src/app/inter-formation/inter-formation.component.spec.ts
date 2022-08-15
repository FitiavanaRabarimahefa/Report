import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterFormationComponent } from './inter-formation.component';

describe('InterFormationComponent', () => {
  let component: InterFormationComponent;
  let fixture: ComponentFixture<InterFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
