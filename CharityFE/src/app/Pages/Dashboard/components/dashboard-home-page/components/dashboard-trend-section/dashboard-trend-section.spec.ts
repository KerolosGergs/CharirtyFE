import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrendSection } from './dashboard-trend-section';

describe('DashboardTrendSection', () => {
  let component: DashboardTrendSection;
  let fixture: ComponentFixture<DashboardTrendSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTrendSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTrendSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
