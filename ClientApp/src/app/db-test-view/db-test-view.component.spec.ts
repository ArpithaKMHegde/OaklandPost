import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbTestViewComponent } from './db-test-view.component';

describe('DbTestViewComponent', () => {
  let component: DbTestViewComponent;
  let fixture: ComponentFixture<DbTestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbTestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbTestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
