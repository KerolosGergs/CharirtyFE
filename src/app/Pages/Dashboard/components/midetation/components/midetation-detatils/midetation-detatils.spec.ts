import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidetationDetatils } from './midetation-detatils';

describe('MidetationDetatils', () => {
  let component: MidetationDetatils;
  let fixture: ComponentFixture<MidetationDetatils>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MidetationDetatils]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MidetationDetatils);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
