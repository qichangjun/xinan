import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home.routing.module';

import { HomePage } from './home.page';

import { UploadPicturesModule } from '../components';

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

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        UploadPicturesModule
    ],
    declarations: [
        HomePage,
        DonationComponent,
        AllRescueComponent,
        DetailsRescueComponent,
        JoinNowComponent,
        DetailsPublicityComponent,
        TermsComponent,
        HelpMoneyPage,
        DonationListPage,
        HelpSuccessPage,
        DiseaseComponent,
        SuccessPayPage,
        SuccessJoinPage,
        SearchComponent,
        UpdateProgressComponent,
        DonationRecordComponent,
        CommentComponent
    ]
})
export class HomePageModule { }
