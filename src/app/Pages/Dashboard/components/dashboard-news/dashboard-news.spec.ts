import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNews } from './dashboard-news';

describe('DashboardNews', () => {
  let component: DashboardNews;
  let fixture: ComponentFixture<DashboardNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
