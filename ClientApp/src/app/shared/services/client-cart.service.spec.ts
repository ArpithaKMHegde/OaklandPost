import { TestBed } from '@angular/core/testing';

import { ClientCartService } from './client-cart.service';

describe('ClientCartService', () => {
  let service: ClientCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
