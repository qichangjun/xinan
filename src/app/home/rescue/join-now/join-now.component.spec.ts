/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JoinNowComponent } from './join-now.component';

describe('JoinNowComponent', () => {
  let component: JoinNowComponent;
  let fixture: ComponentFixture<JoinNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
