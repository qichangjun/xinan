import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MeRoutingModule } from './me.routing.module';
import { XinanCardModule, UploadHeadModule } from '../components';

import { MePage } from './me.page';

import { RescuedComponent } from './rescued/rescued.component';
import { DonationedComponent } from './donationed/donationed.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        MeRoutingModule,
        XinanCardModule,
        UploadHeadModule
    ],
    declarations: [
        MePage,
        RescuedComponent,
        DonationedComponent,
        HomepageComponent
    ]
})
export class MePageModule { }
