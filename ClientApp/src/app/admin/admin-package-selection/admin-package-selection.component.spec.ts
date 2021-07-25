import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPackageSelectionComponent } from './admin-package-selection.component';

describe('AdminPackageSelectionComponent', () => {
  let component: AdminPackageSelectionComponent;
  let fixture: ComponentFixture<AdminPackageSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPackageSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPackageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
