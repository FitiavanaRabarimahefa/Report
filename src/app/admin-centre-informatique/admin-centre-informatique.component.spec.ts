import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCentreInformatiqueComponent } from './admin-centre-informatique.component';

describe('AdminCentreInformatiqueComponent', () => {
  let component: AdminCentreInformatiqueComponent;
  let fixture: ComponentFixture<AdminCentreInformatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCentreInformatiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCentreInformatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
