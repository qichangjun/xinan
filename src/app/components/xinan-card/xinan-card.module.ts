import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { XinanCardComponent } from './xinan-card.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [XinanCardComponent],
    exports: [XinanCardComponent]
})
export class XinanCardModule { }
