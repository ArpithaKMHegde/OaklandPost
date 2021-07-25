import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPackageSelectionComponent } from './client-package-selection.component';

describe('ClientPackageSelectionComponent', () => {
  let component: ClientPackageSelectionComponent;
  let fixture: ComponentFixture<ClientPackageSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPackageSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPackageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
