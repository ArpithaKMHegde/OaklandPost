import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUserAccountComponent } from './user-account.component';

describe('UserAccountComponent', () => {
  let component: ClientUserAccountComponent;
  let fixture: ComponentFixture<ClientUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientUserAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
