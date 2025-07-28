import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCallender } from './new-callender';

describe('NewCallender', () => {
  let component: NewCallender;
  let fixture: ComponentFixture<NewCallender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCallender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCallender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
