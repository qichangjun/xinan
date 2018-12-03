/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InviteJoinComponent } from './invite-join.component';

describe('InviteJoinComponent', () => {
  let component: InviteJoinComponent;
  let fixture: ComponentFixture<InviteJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
