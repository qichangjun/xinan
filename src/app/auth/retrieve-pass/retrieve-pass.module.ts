import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { Routes, RouterModule } from '@angular/router';

import { RetrievePassPage } from './retrieve-pass.page';
import { InputFocusDirectiveModule } from '../../directives';

const routes: Routes = [
    {
        path: '',
        component: RetrievePassPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        InputFocusDirectiveModule
    ],
    declarations: [
        RetrievePassPage
    ]
})
export class RetrievePassPageModule { }
