import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetupPackageComponent } from './admin-setup-package.component';

describe('AdminSetupPackageComponent', () => {
  let component: AdminSetupPackageComponent;
  let fixture: ComponentFixture<AdminSetupPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSetupPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSetupPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
