import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPackageOverviewComponent } from './client-package-overview.component';

describe('ClientPackageOverviewComponent', () => {
  let component: ClientPackageOverviewComponent;
  let fixture: ComponentFixture<ClientPackageOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPackageOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPackageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
