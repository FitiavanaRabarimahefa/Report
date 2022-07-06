import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPatrimoineComponent } from './admin-patrimoine.component';

describe('AdminPatrimoineComponent', () => {
  let component: AdminPatrimoineComponent;
  let fixture: ComponentFixture<AdminPatrimoineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPatrimoineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPatrimoineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
