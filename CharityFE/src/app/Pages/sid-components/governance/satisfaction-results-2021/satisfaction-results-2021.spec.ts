import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionResults2021 } from './satisfaction-results-2021';

describe('SatisfactionResults2021', () => {
  let component: SatisfactionResults2021;
  let fixture: ComponentFixture<SatisfactionResults2021>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatisfactionResults2021]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionResults2021);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
