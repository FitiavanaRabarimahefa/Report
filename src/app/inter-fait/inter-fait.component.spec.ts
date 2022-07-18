import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterFaitComponent } from './inter-fait.component';

describe('InterFaitComponent', () => {
  let component: InterFaitComponent;
  let fixture: ComponentFixture<InterFaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterFaitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterFaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
