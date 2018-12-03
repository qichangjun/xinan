import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPassComponent } from './modify-pass.component';

describe('ModifyPassComponent', () => {
    let component: ModifyPassComponent;
    let fixture: ComponentFixture<ModifyPassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModifyPassComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModifyPassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
