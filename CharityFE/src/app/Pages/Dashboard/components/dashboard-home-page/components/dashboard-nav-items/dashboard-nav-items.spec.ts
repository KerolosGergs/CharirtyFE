import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavItems } from './dashboard-nav-items';

describe('DashboardNavItems', () => {
  let component: DashboardNavItems;
  let fixture: ComponentFixture<DashboardNavItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNavItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNavItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
