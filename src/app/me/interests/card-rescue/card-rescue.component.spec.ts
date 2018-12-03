/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardRescueComponent } from './card-rescue.component';

describe('CardRescueComponent', () => {
  let component: CardRescueComponent;
  let fixture: ComponentFixture<CardRescueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRescueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRescueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
