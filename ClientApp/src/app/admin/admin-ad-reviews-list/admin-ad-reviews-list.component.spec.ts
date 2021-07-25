import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdReviewsListViewComponent } from './admin-ad-reviews-list.component';

describe('AdminAdReviewsListViewComponent', () => {
  let component: AdminAdReviewsListViewComponent;
  let fixture: ComponentFixture<AdminAdReviewsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdReviewsListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdReviewsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
