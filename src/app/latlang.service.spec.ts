import { TestBed } from '@angular/core/testing';

import { LatlangService } from './latlang.service';

describe('LatlangService', () => {
  let service: LatlangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatlangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
