import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorAvailabilityManagerComponent } from './advisor-availability-manager.component';

describe('AdvisorAvailabilityManagerComponent', () => {
  let component: AdvisorAvailabilityManagerComponent;
  let fixture: ComponentFixture<AdvisorAvailabilityManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorAvailabilityManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorAvailabilityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
