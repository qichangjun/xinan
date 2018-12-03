import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MePage } from './me.page';

import { RescuedComponent } from './rescued/rescued.component';
import { DonationedComponent } from './donationed/donationed.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
    { path: '', component: MePage },
    { path: 'auth', loadChildren: '../auth/auth.module#AuthModule' },
    { path: 'interests', loadChildren: './interests/interests.module#InterestsModule' }, // 会员权益
    { path: 'info', loadChildren: './info/info.module#InfoModule' }, // 用户信息及修改
    { path: 'relatives', loadChildren: './relatives/relatives.module#RelativesModule' }, // 添加亲友
    { path: 'invite', loadChildren: './invite/invite.module#InviteModule' }, // 邀请
    { path: 'rescue_apply', loadChildren: './rescue-apply/rescue-apply.module#RescueApplyModule' }, // 救助申请
    { path: 'giving_apply', loadChildren: './giving-apply/giving-apply.module#GivingApplyModule' }, // 乐捐申请
    { path: 'rescued', component: RescuedComponent }, // 我救助过得
    { path: 'donationed', component: DonationedComponent }, // 我乐捐过得
    { path: 'homepage', component: HomepageComponent }, // 个人主页
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeRoutingModule { }
