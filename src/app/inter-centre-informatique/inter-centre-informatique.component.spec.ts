import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterCentreInformatiqueComponent } from './inter-centre-informatique.component';

describe('InterCentreInformatiqueComponent', () => {
  let component: InterCentreInformatiqueComponent;
  let fixture: ComponentFixture<InterCentreInformatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterCentreInformatiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterCentreInformatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
