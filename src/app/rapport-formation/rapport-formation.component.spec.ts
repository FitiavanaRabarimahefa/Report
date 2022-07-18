import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportFormationComponent } from './rapport-formation.component';

describe('RapportFormationComponent', () => {
  let component: RapportFormationComponent;
  let fixture: ComponentFixture<RapportFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
