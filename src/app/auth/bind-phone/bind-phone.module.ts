import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { Routes, RouterModule } from '@angular/router';

import { BindPhonePage } from './bind-phone.page';
import { InputFocusDirectiveModule } from '../../directives';

const routes: Routes = [
    {
        path: '',
        component: BindPhonePage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        InputFocusDirectiveModule
    ],
    declarations: [BindPhonePage]
})
export class BindPhonePageModule { }
