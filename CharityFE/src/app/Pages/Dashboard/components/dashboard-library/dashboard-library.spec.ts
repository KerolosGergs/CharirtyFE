import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLibrary } from './dashboard-library';

describe('DashboardLibrary', () => {
  let component: DashboardLibrary;
  let fixture: ComponentFixture<DashboardLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
