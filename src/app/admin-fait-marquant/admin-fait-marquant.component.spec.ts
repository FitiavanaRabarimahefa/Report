import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFaitMarquantComponent } from './admin-fait-marquant.component';

describe('AdminFaitMarquantComponent', () => {
  let component: AdminFaitMarquantComponent;
  let fixture: ComponentFixture<AdminFaitMarquantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFaitMarquantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFaitMarquantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
