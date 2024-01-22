import { TestBed } from '@angular/core/testing';

import { SanityClientService } from './sanity-client.service';

describe('SanityClientService', () => {
  let service: SanityClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanityClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
