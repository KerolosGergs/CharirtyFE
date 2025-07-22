import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousConsultations } from './previous-consultations';

describe('PreviousConsultations', () => {
  let component: PreviousConsultations;
  let fixture: ComponentFixture<PreviousConsultations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousConsultations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousConsultations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
