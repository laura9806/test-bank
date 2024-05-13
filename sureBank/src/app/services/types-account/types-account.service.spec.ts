import { TestBed } from '@angular/core/testing';

import { TypesAccountService } from './types-account.service';

describe('TypesAccountService', () => {
  let service: TypesAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
