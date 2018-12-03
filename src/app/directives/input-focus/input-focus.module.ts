import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { InputFocusDirective } from './input-focus.directive';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [InputFocusDirective],
    exports: [InputFocusDirective]
})
export class InputFocusDirectiveModule { }
