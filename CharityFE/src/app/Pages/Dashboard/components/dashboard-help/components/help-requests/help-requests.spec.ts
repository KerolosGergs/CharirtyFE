import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestsComponent } from './help-requests';

describe('HelpRequests', () => {
  let component: HelpRequestsComponent;
  let fixture: ComponentFixture<HelpRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
