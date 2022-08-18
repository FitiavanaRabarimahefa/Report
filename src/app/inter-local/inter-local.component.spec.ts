import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterLocalComponent } from './inter-local.component';

describe('InterLocalComponent', () => {
  let component: InterLocalComponent;
  let fixture: ComponentFixture<InterLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
