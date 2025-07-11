import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorProfile } from './advisor-profile';

describe('AdvisorProfile', () => {
  let component: AdvisorProfile;
  let fixture: ComponentFixture<AdvisorProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
