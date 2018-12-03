import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelativesComponent } from './relatives.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { FillInfomationComponent } from './fill-infomation/fill-infomation.component';
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
    { path: '', component: RelativesComponent },
    { path: 'select-service', component: SelectServiceComponent }, // 选择服务
    { path: 'fill-information/:service', component: FillInfomationComponent }, // 添加亲友-填写资料
    { path: 'pay', component: PayComponent }, // 添加亲友-年费支付
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RelativesRoutingModule { }
