import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountInfoDialogComponent } from './admin-account-info-dialog.component';

describe('AdminAccountInfoDialogComponent', () => {
  let component: AdminAccountInfoDialogComponent;
  let fixture: ComponentFixture<AdminAccountInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAccountInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
