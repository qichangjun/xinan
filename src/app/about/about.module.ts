import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AboutPage } from './about.page';
import { IonProductsModule, PayGoodsModule } from '../components';
import { AboutRoutingModule } from './about.routing.module';

import { PayComponent } from './pay/pay.component';
import { WaitPayComponent } from './wait-pay/wait-pay.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { DetailsShopComponent } from './details-shop/details-shop.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { AllOrderComponent } from './all-order/all-order.component';
import { LogisticsDetailComponent } from './logistics-detail/logistics-detail.component';
import { MoreListComponent } from './more-list/more-list.component';

import { ClassifyComponent } from './classify/classify.component';
@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        IonProductsModule,
        AboutRoutingModule,
        PayGoodsModule
    ],
    declarations: [
        AboutPage,
        PayComponent,
        WaitPayComponent,
        ConfirmOrderComponent,
        DetailsShopComponent,
        ShoppingCardComponent,
        AllOrderComponent,
        LogisticsDetailComponent,
        MoreListComponent,
        ClassifyComponent
    ],
})
export class AboutPageModule { }
