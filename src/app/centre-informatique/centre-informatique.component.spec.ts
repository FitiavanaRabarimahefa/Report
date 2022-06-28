import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreInformatiqueComponent } from './centre-informatique.component';

describe('CentreInformatiqueComponent', () => {
  let component: CentreInformatiqueComponent;
  let fixture: ComponentFixture<CentreInformatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreInformatiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreInformatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
