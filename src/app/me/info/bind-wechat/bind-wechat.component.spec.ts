import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindWechatComponent } from './bind-wechat.component';

describe('BindWechatComponent', () => {
  let component: BindWechatComponent;
  let fixture: ComponentFixture<BindWechatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindWechatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindWechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
