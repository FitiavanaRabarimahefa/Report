import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimoineEtatComponent } from './patrimoine-etat.component';

describe('PatrimoineEtatComponent', () => {
  let component: PatrimoineEtatComponent;
  let fixture: ComponentFixture<PatrimoineEtatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatrimoineEtatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimoineEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
