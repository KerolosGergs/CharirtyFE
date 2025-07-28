import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceForm2021 } from './clearance-form-2021';

describe('ClearanceForm2021', () => {
  let component: ClearanceForm2021;
  let fixture: ComponentFixture<ClearanceForm2021>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearanceForm2021]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearanceForm2021);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
