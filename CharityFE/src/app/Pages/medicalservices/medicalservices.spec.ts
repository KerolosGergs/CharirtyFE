import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Medicalservices } from './medicalservices';

describe('Medicalservices', () => {
  let component: Medicalservices;
  let fixture: ComponentFixture<Medicalservices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Medicalservices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Medicalservices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
