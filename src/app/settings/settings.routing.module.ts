import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { AboutUsComponent } from './about-us/about-us.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
    { path: '', component: SettingsPage },
    { path: 'aboutUs', component: AboutUsComponent }, // 关于
    { path: 'feedback', component: FeedbackComponent }, // 意见反馈
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
