import { TestBed } from '@angular/core/testing';

import { NavItem } from './nav-item';

describe('NavItem', () => {
  let service: NavItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
