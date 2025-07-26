import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingCenter } from './hearing-center';

describe('HearingCenter', () => {
  let component: HearingCenter;
  let fixture: ComponentFixture<HearingCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HearingCenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HearingCenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
