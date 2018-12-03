import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RescueApplyRouting } from './rescue-apply.routing';
import { UploadPicturesModule, XinanCardModule } from '../../components';

import { RescueApplyComponent } from './rescue-apply.component';
import { ApplyNowComponent } from './apply-now/apply-now.component';
import { AddFriendsComponent } from './add-friends/add-friends.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RescueApplyRouting,
        UploadPicturesModule,
        XinanCardModule
    ],
    declarations: [
        RescueApplyComponent,
        ApplyNowComponent,
        AddFriendsComponent
    ]
})
export class RescueApplyModule { }
