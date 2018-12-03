import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FondRoutingModule } from './fond.routing.module';
import { FondPage } from './fond.page';
import { CommonProblemPage } from './common-problem/common-problem.page';
import { JoinVipPage } from './join-vip/join-vip.page';
import { NoticePage } from './notice/notice.page';
import { ProbleDetailsPage } from './proble-details/proble-details.page';
import { ShareComponent } from './share/share.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        FondRoutingModule,
        RouterModule.forChild([{ path: '', component: FondPage }])
    ],
    declarations: [
        FondPage,
        CommonProblemPage,
        JoinVipPage,
        NoticePage,
        ProbleDetailsPage,
        ShareComponent
    ],
    entryComponents: [
        FondPage,
    ]
})
export class FondPageModule { }
