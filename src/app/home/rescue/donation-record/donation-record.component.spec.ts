import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationRecordComponent } from './donation-record.component';

describe('DonationRecordComponent', () => {
  let component: DonationRecordComponent;
  let fixture: ComponentFixture<DonationRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
