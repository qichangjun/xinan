import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { RelativesRoutingModule } from './relatives.routing.module';
import { RelativesComponent } from './relatives.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { FillInfomationComponent } from './fill-infomation/fill-infomation.component';
import { PayComponent } from './pay/pay.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RelativesRoutingModule
    ],
    declarations: [
        RelativesComponent,
        SelectServiceComponent,
        FillInfomationComponent,
        PayComponent
    ]
})
export class RelativesModule { }
