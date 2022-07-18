import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterBaafComponent } from './inter-baaf.component';

describe('InterBaafComponent', () => {
  let component: InterBaafComponent;
  let fixture: ComponentFixture<InterBaafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterBaafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterBaafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
