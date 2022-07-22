import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterPatrimoineComponent } from './inter-patrimoine.component';

describe('InterPatrimoineComponent', () => {
  let component: InterPatrimoineComponent;
  let fixture: ComponentFixture<InterPatrimoineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterPatrimoineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterPatrimoineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
