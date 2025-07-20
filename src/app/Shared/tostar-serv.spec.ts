import { TestBed } from '@angular/core/testing';

import { TostarServ } from './tostar-serv';

describe('TostarServ', () => {
  let service: TostarServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TostarServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
