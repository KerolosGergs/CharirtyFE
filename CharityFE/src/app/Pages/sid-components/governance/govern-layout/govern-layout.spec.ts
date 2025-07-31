import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernLayout } from './govern-layout';

describe('GovernLayout', () => {
  let component: GovernLayout;
  let fixture: ComponentFixture<GovernLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovernLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
