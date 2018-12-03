import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SignInPage } from './sign-in.page';
import { InputFocusDirectiveModule } from '../../directives';

const routes: Routes = [
    {
        path: '',
        component: SignInPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        InputFocusDirectiveModule
    ],
    declarations: [SignInPage]
})
export class SignInPageModule { }
