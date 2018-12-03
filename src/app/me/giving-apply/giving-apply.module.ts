import { from } from 'apollo-link';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GivingApplyRouting } from './giving-apply.routing';
import { XinanCardModule } from '../../components';

import { GivingApplyComponent } from './giving-apply.component';
import { ApplyLjComponent } from './apply-lj/apply-lj.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GivingApplyRouting,
        XinanCardModule
    ],
    declarations: [
        GivingApplyComponent,
        ApplyLjComponent
    ]
})
export class GivingApplyModule { }
