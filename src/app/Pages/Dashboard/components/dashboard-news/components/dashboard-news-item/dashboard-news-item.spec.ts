import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNewsItem } from './dashboard-news-item';

describe('DashboardNewsItem', () => {
  let component: DashboardNewsItem;
  let fixture: ComponentFixture<DashboardNewsItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNewsItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNewsItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
