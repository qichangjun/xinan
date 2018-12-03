import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite.routing.module';
import { InviteComponent } from './invite.component';
import { InviteFriendComponent } from './invite-friend/invite-friend.component';
import { InviteSuccessComponent } from './invite-success/invite-success.component';
import { InviteJoinComponent } from './invite-join/invite-join.component';

// import { MultiPickerModule } from 'ion-multi-picker';
// import { InviteService } from './invite.service';
@NgModule({
    // providers: [InviteService],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        InviteRoutingModule,

        // MultiPickerModule,
    ],
    declarations: [
        InviteComponent,
        InviteFriendComponent,
        InviteSuccessComponent,
        InviteJoinComponent
    ]
})
export class InviteModule { }

