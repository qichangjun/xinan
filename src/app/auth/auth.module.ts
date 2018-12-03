import { NgModule } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth.routing.module';

import { SignInPageModule } from './sign-in/sign-in.module';
import { SignUpPageModule } from './sign-up/sign-up.module';
import { RetrievePassPageModule } from './retrieve-pass/retrieve-pass.module';
import { BindPhonePageModule } from './bind-phone/bind-phone.module';
import { ModifyPassComponent } from './modify-pass/modify-pass.component';
import { InputFocusDirectiveModule } from '../directives';

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule,
        SignInPageModule,
        SignUpPageModule,
        RetrievePassPageModule,
        BindPhonePageModule,
        InputFocusDirectiveModule
    ],
    declarations: [
        ModifyPassComponent
    ]
})
export class AuthModule { }
