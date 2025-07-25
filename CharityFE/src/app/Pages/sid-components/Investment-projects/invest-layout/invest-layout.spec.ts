import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestLayout } from './invest-layout';

describe('InvestLayout', () => {
  let component: InvestLayout;
  let fixture: ComponentFixture<InvestLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
