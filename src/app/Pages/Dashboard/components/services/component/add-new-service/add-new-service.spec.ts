import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewService } from './add-new-service';

describe('AddNewService', () => {
  let component: AddNewService;
  let fixture: ComponentFixture<AddNewService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
