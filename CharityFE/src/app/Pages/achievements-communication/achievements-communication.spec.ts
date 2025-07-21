import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsCommunication } from './achievements-communication';

describe('AchievementsCommunication', () => {
  let component: AchievementsCommunication;
  let fixture: ComponentFixture<AchievementsCommunication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementsCommunication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementsCommunication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
