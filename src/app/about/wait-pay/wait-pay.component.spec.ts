/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WaitPayComponent } from './wait-pay.component';

describe('WaitPayComponent', () => {
  let component: WaitPayComponent;
  let fixture: ComponentFixture<WaitPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
