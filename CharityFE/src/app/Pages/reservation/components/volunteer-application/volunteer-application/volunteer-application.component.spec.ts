import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerApplicationComponent } from './volunteer-application.component';

describe('VolunteerApplicationComponent', () => {
  let component: VolunteerApplicationComponent;
  let fixture: ComponentFixture<VolunteerApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
