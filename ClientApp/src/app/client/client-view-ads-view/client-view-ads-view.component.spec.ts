import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewAdsViewComponent } from './client-view-ads-view.component';

describe('ClientViewAdsViewComponent', () => {
  let component: ClientViewAdsViewComponent;
  let fixture: ComponentFixture<ClientViewAdsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientViewAdsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientViewAdsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
