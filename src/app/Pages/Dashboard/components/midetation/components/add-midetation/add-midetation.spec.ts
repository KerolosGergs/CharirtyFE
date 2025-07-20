import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMidetation } from './add-midetation';

describe('AddMidetation', () => {
  let component: AddMidetation;
  let fixture: ComponentFixture<AddMidetation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMidetation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMidetation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
