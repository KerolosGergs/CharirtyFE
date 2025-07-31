import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicPlan } from './strategic-plan';

describe('StrategicPlan', () => {
  let component: StrategicPlan;
  let fixture: ComponentFixture<StrategicPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategicPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
