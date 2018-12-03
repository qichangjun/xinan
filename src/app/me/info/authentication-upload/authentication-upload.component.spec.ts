import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationUploadComponent } from './authentication-upload.component';

describe('AuthenticationUploadComponent', () => {
  let component: AuthenticationUploadComponent;
  let fixture: ComponentFixture<AuthenticationUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
