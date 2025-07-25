import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedcineLayout } from './medcine-layout';

describe('MedcineLayout', () => {
  let component: MedcineLayout;
  let fixture: ComponentFixture<MedcineLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedcineLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedcineLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
