import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeroSection } from './dashboard-hero-section';

describe('DashboardHeroSection', () => {
  let component: DashboardHeroSection;
  let fixture: ComponentFixture<DashboardHeroSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHeroSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHeroSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
