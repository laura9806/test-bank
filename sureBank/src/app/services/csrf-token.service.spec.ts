import { TestBed } from '@angular/core/testing';
import { CsrfTokenService } from 'src/app/services/csrf-token.service';


describe('CsrfTokenServiceTsService', () => {
  let service: CsrfTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsrfTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
