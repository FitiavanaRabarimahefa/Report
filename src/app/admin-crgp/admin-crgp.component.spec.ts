import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrgpComponent } from './admin-crgp.component';

describe('AdminCrgpComponent', () => {
  let component: AdminCrgpComponent;
  let fixture: ComponentFixture<AdminCrgpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCrgpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
