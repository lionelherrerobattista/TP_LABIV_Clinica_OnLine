import { TestBed } from '@angular/core/testing';

import { FstorageService } from './fstorage.service';

describe('FstorageService', () => {
  let service: FstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
