import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RescueApplyComponent } from './rescue-apply.component';
import { ApplyNowComponent } from './apply-now/apply-now.component';
import { AddFriendsComponent } from './add-friends/add-friends.component';

const routes: Routes = [
    { path: '', component: RescueApplyComponent },
    { path: 'apply_now', component: ApplyNowComponent }, // 申请救助
    { path: 'add_friends/:id', component: AddFriendsComponent }, // 填写资料
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RescueApplyRouting { }
