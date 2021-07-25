import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewConfirmedAdDetailsComponent } from './admin-view-confirmed-ad-details.component';

describe('AdminViewConfirmedAdDetailsComponent', () => {
  let component: AdminViewConfirmedAdDetailsComponent;
  let fixture: ComponentFixture<AdminViewConfirmedAdDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewConfirmedAdDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewConfirmedAdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
