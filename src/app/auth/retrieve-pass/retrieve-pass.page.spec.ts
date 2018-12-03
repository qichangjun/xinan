import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievePassPage } from './retrieve-pass.page';

describe('RetrievePassPage', () => {
  let component: RetrievePassPage;
  let fixture: ComponentFixture<RetrievePassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrievePassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrievePassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
