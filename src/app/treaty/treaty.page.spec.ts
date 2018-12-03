import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatyPage } from './treaty.page';

describe('TreatyPage', () => {
  let component: TreatyPage;
  let fixture: ComponentFixture<TreatyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
