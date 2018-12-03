import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignUpPage } from './sign-up.page';
import { InputFocusDirectiveModule } from '../../directives';
// import { BackHeaderComponent } from '../../components/back/back-header';

const routes: Routes = [
    {
        path: '',
        component: SignUpPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
        InputFocusDirectiveModule
    ],
    declarations: [
        SignUpPage,
        // BackHeaderComponent
    ]
})
export class SignUpPageModule { }
