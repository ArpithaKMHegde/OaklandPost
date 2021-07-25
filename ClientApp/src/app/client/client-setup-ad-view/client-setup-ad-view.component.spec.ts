import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSetupAdViewComponent } from './client-setup-ad-view.component';

describe('ClientSetupAdViewComponent', () => {
  let component: ClientSetupAdViewComponent;
  let fixture: ComponentFixture<ClientSetupAdViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSetupAdViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSetupAdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
