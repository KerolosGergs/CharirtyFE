import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionResults2023 } from './satisfaction-results-2023';

describe('SatisfactionResults2023', () => {
  let component: SatisfactionResults2023;
  let fixture: ComponentFixture<SatisfactionResults2023>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatisfactionResults2023]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionResults2023);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
