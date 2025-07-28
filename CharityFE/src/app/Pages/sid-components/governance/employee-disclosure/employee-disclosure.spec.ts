import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDisclosure } from './employee-disclosure';

describe('EmployeeDisclosure', () => {
  let component: EmployeeDisclosure;
  let fixture: ComponentFixture<EmployeeDisclosure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDisclosure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDisclosure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
