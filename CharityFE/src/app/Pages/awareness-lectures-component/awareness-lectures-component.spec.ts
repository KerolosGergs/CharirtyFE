import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwarenessLecturesComponent } from './awareness-lectures-component';

describe('AwarenessLecturesComponent', () => {
  let component: AwarenessLecturesComponent;
  let fixture: ComponentFixture<AwarenessLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwarenessLecturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwarenessLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
