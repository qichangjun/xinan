import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInfomationComponent } from './fill-infomation.component';

describe('FillInfomationComponent', () => {
  let component: FillInfomationComponent;
  let fixture: ComponentFixture<FillInfomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInfomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
