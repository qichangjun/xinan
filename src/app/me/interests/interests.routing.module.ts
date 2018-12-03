import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterestsComponent } from './interests.component';
import { CardMemberComponent } from './card-member/card-member.component';
import { SuccessPage } from './success/success.page';
import { CardRescueComponent } from './card-rescue/card-rescue.component';
import { VipIntegralPage } from './vip-integral/vip-integral.page';
import { IntegralDetailPage } from './integral-detail/integral-detail.page';

const routes: Routes = [
    // { path: '', redirectTo: 'interests', pathMatch: 'full' },
    { path: '', component: InterestsComponent },
    { path: 'member', component: CardMemberComponent }, // 会员卡充值
    { path: 'success/:id', component: SuccessPage }, // 成功  1 服务费充值成功　２　救助充值成功
    { path: 'rescue', component: CardRescueComponent }, // 救助卡充值
    { path: 'vip_integral', component: VipIntegralPage }, // 会员积分
    { path: 'integral_detail', component: IntegralDetailPage }, // 积分详情
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InterestsRoutingModule { }
