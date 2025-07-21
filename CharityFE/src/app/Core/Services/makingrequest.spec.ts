import { TestBed } from '@angular/core/testing';

import { Makingrequest } from './makingrequest';

describe('Makingrequest', () => {
  let service: Makingrequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Makingrequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
