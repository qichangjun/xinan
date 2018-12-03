import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPage } from './sign-in/sign-in.page';
import { SignUpPage } from './sign-up/sign-up.page';
import { RetrievePassPage } from './retrieve-pass/retrieve-pass.page';
import { BindPhonePage } from './bind-phone/bind-phone.page';
import { ModifyPassComponent } from './modify-pass/modify-pass.component';

const routes: Routes = [
    {
        path: '',
        component: SignInPage
    },
    { // 密码登录 & 验证码登录 & 微信登录
        path: 'sign-in',
        component: SignInPage
    },
    { // 验证码注册时设置登录密码
        path: 'sign-up',
        component: SignUpPage
    },
    { // 找回密码
        path: 'retrieve-pass',
        component: RetrievePassPage
    },
    { // 微信登录授权成功后绑定手机号
        path: 'bind-phone',
        component: BindPhonePage
    },
    { // 修改登录密码（设置里的）
        path: 'modify-pass',
        component: ModifyPassComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

