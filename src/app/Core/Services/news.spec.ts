import { TestBed } from '@angular/core/testing';

import { newsservice } from './news';

describe('News', () => {
  let service: newsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(newsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
