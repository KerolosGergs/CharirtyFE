import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCenter } from './medical-center';

describe('MedicalCenter', () => {
  let component: MedicalCenter;
  let fixture: ComponentFixture<MedicalCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalCenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalCenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
