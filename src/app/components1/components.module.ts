import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { BackHeaderComponent } from './back/back-header';
import { PopoverComponent } from './popover/popover.component';

const coms: any[] = [
    BackHeaderComponent,
    PopoverComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        IonicModule.forRoot(),
    ],
    declarations:
        coms
    ,
    exports:
        coms
    ,
    entryComponents: [],
})
export class ComponentsModule { }
