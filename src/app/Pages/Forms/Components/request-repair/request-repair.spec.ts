import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRepair } from './request-repair';

describe('RequestRepair', () => {
  let component: RequestRepair;
  let fixture: ComponentFixture<RequestRepair>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestRepair]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRepair);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
