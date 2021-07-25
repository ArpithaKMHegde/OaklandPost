import { TestBed } from '@angular/core/testing';

import { DbMyAdsService } from './my-ads.service';

describe('DbMyAdsService', () => {
  let service: DbMyAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbMyAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});