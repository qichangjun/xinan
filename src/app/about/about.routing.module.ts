import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './about.page';
import { PayComponent } from './pay/pay.component';
import { WaitPayComponent } from './wait-pay/wait-pay.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { DetailsShopComponent } from './details-shop/details-shop.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { AllOrderComponent } from './all-order/all-order.component';
import { LogisticsDetailComponent } from './logistics-detail/logistics-detail.component';
import { MoreListComponent } from './more-list/more-list.component';
import { ClassifyComponent } from './classify/classify.component';

const routes: Routes = [
    { path: '', component: AboutPage },
    { path: 'classify', component: ClassifyComponent },　 // 全部分类
    { path: 'more_list', component: MoreListComponent }, // 查看更多
    { path: 'details/:id', component: DetailsShopComponent }, // 商品详情
    { path: 'card', component: ShoppingCardComponent }, // 商品购物车

    { path: 'all_order', component: AllOrderComponent },　 // 商城订单
    { path: 'wait_pay/:id', component: WaitPayComponent }, // 1等待支付　２订单详情
    { path: 'confirm_order', component: ConfirmOrderComponent },　 // 确认订单
    { path: 'logistics_detail', component: LogisticsDetailComponent },　 // 物流详情
    // { path: 'pay', component: PayComponent },　 //  确认支付
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule {
}
