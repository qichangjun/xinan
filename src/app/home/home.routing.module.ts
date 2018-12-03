import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AllRescueComponent } from './rescue/all-rescue/all-rescue.component';
import { SuccessJoinPage } from './success-join/success-join.page';
import { DetailsPublicityComponent } from './rescue/details-publicity/details-publicity.component';
import { SuccessPayPage } from './success-pay/success-pay.page';
import { DiseaseComponent } from './rescue/disease/disease.component';
import { CommentComponent } from './comment/comment.component';

import { HelpMoneyPage } from './rescue/help-money/help-money.page';
import { DonationListPage } from './rescue/donation-list/donation-list.page';
import { DetailsRescueComponent } from './rescue/details-rescue/details-rescue.component';
import { JoinNowComponent } from './rescue/join-now/join-now.component';
import { TermsComponent } from './rescue/terms/terms.component';

import { DonationComponent } from './giving/donation/donation.component';
import { HelpSuccessPage } from './giving/help-success/help-success.page';

import { SearchComponent } from './search/search.component';
import { UpdateProgressComponent } from './rescue/update-progress/update-progress.component';
import { DonationRecordComponent } from './rescue/donation-record/donation-record.component';

const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'search', component: SearchComponent },  // 搜索
    { path: 'update_progress', component: UpdateProgressComponent }, // 救助、乐捐 更新进展
    { path: 'donation_record', component: DonationRecordComponent }, // 乐捐记录
    { path: 'details_xa', component: DetailsPublicityComponent }, // 救助、乐捐详情
    { path: 'all_rescue/:id', component: AllRescueComponent }, // 所有已救助和已乐捐
    { path: 'success-join', component: SuccessJoinPage }, // 加入成功
    { path: 'success-pay', component: SuccessPayPage }, // 支付成功
    { path: 'comment', component: CommentComponent }, // 评论

    // 救助
    { path: 'help_money', component: HelpMoneyPage },  // 救助资金池
    { path: 'details_publicity', component: DetailsRescueComponent }, // 心安救助专项基金
    { path: 'join_now', component: JoinNowComponent }, // 加入心安救助
    { path: 'terms', component: TermsComponent }, // 加入心安救助条款
    { path: '80disease', component: DiseaseComponent }, // 80种疾病

    // 乐捐
    { path: 'donation', component: DonationComponent }, // 我要捐款
    { path: 'donation_list', component: DonationListPage },  // 乐捐资金池
    { path: 'help_success', component: HelpSuccessPage },  // 帮扶成功
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

