import { TestBed } from '@angular/core/testing';

import { AppcryptoService } from './appcrypto.service';

describe('AppcryptoService', () => {
  let service: AppcryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppcryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
