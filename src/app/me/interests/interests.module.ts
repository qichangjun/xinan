import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { InterestsRoutingModule } from './interests.routing.module';

import { InterestsComponent } from './interests.component';
import { CardMemberComponent } from './card-member/card-member.component';
import { SuccessPage } from './success/success.page';
import { CardRescueComponent } from './card-rescue/card-rescue.component';
import { VipIntegralPage } from './vip-integral/vip-integral.page';
import { IntegralDetailPage } from './integral-detail/integral-detail.page';
@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        InterestsRoutingModule
    ],
    declarations: [
        InterestsComponent,
        CardMemberComponent,
        SuccessPage,
        CardRescueComponent,
        VipIntegralPage,
        IntegralDetailPage
    ]
})
export class InterestsModule { }
