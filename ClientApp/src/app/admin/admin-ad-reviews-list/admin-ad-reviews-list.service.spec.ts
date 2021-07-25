import { TestBed } from '@angular/core/testing';

import { DbAdminAdReviewsListService } from './admin-ad-reviews-list.service';

describe('DbMyAdsService', () => {
  let service: DbAdminAdReviewsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbAdminAdReviewsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});