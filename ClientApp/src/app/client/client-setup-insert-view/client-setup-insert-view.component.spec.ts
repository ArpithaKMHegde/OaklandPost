import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSetupInsertViewComponent } from './client-setup-insert-view.component';

describe('ClientSetupAdViewComponent', () => {
  let component: ClientSetupInsertViewComponent;
  let fixture: ComponentFixture<ClientSetupInsertViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientSetupInsertViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSetupInsertViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
