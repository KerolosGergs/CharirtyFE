import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionSurveys } from './satisfaction-surveys';

describe('SatisfactionSurveys', () => {
  let component: SatisfactionSurveys;
  let fixture: ComponentFixture<SatisfactionSurveys>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatisfactionSurveys]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionSurveys);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
