import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestProject } from './invest-project';

describe('InvestProject', () => {
  let component: InvestProject;
  let fixture: ComponentFixture<InvestProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
