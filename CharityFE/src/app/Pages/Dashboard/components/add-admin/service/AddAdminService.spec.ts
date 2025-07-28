import { TestBed } from '@angular/core/testing';

import { AddAdminService } from './AddAdminService';

describe('HelpService', () => {
  let service: AddAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
