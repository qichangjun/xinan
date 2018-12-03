import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPicturesModule } from '../components';

import { SettingsPage } from './settings.page';
import { SettingsRoutingModule } from './settings.routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SettingsRoutingModule,
        UploadPicturesModule
    ],
    declarations: [
        SettingsPage,
        AboutUsComponent,
        FeedbackComponent
    ]
})
export class SettingsPageModule { }
