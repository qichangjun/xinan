import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FondPage } from './fond.page';

import { CommonProblemPage } from './common-problem/common-problem.page';
import { JoinVipPage } from './join-vip/join-vip.page';
import { NoticePage } from './notice/notice.page';
import { ProbleDetailsPage } from './proble-details/proble-details.page';
import { ShareComponent } from './share/share.component';

const routes: Routes = [
    { path: '', component: FondPage },
    { path: 'common_problem', component: CommonProblemPage }, // 常见问题
    { path: 'join_vip', component: JoinVipPage }, // 常见问题
    { path: 'notice', component: NoticePage }, // 通知
    { path: 'problem_details/:id', component: ProbleDetailsPage }, // 问题详情
    { path: 'share', component: ShareComponent }, // 分享心安


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FondRoutingModule { }

