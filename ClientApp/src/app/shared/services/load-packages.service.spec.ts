import { TestBed } from '@angular/core/testing';

import { LoadPackagesService } from './package-list.service';

describe('LoadPackagesService', () => {
  let service: LoadPackagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadPackagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
