import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterCrgpComponent } from './inter-crgp.component';

describe('InterCrgpComponent', () => {
  let component: InterCrgpComponent;
  let fixture: ComponentFixture<InterCrgpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterCrgpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterCrgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
