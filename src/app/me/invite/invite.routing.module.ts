import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteComponent } from './invite.component';
import { InviteFriendComponent } from './invite-friend/invite-friend.component';
import { InviteSuccessComponent } from './invite-success/invite-success.component';
import { InviteJoinComponent } from './invite-join/invite-join.component';

const routes: Routes = [
    // { path: '', redirectTo: 'interests', pathMatch: 'full' },
    { path: '', component: InviteComponent },
    { path: 'friend', component: InviteFriendComponent },
    { path: 'success', component: InviteSuccessComponent },
    { path: 'join', component: InviteJoinComponent },


];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InviteRoutingModule { }
