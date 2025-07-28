import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionResults2022 } from './satisfaction-results-2022';

describe('SatisfactionResults2022', () => {
  let component: SatisfactionResults2022;
  let fixture: ComponentFixture<SatisfactionResults2022>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatisfactionResults2022]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionResults2022);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
