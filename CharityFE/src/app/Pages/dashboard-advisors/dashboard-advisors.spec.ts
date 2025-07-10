import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdvisors } from './dashboard-advisors';

describe('DashboardAdvisors', () => {
  let component: DashboardAdvisors;
  let fixture: ComponentFixture<DashboardAdvisors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdvisors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAdvisors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
