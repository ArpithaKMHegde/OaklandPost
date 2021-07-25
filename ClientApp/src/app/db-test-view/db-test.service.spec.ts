import { TestBed } from '@angular/core/testing';

import { DbTestService } from './db-test.service';

describe('DbTestService', () => {
  let service: DbTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
