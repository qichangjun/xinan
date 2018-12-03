import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureEditComponent } from './signature-edit.component';

describe('SignatureEditComponent', () => {
  let component: SignatureEditComponent;
  let fixture: ComponentFixture<SignatureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
