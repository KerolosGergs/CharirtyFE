import { TestBed } from '@angular/core/testing';

import { Advicereques } from './advicereques';

describe('Advicereques', () => {
  let service: Advicereques;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Advicereques);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
