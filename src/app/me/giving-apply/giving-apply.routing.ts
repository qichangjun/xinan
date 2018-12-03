import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GivingApplyComponent } from './giving-apply.component';
import { ApplyLjComponent } from './apply-lj/apply-lj.component';

const routes: Routes = [
    { path: '', component: GivingApplyComponent },
    { path: 'apply_lj', component: ApplyLjComponent }, // 申请救助
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GivingApplyRouting { }
