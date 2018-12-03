import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PayGoodsComponent } from './pay-goods.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [PayGoodsComponent],
    exports: [PayGoodsComponent]
})
export class PayGoodsModule { }
