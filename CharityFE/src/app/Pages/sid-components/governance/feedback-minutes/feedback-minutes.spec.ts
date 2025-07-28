import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackMinutes } from './feedback-minutes';

describe('FeedbackMinutes', () => {
  let component: FeedbackMinutes;
  let fixture: ComponentFixture<FeedbackMinutes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackMinutes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackMinutes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
