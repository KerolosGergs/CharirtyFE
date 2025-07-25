import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalVolunteering } from './medical-volunteering';

describe('MedicalVolunteering', () => {
  let component: MedicalVolunteering;
  let fixture: ComponentFixture<MedicalVolunteering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalVolunteering]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalVolunteering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
