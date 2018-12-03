import { NgModule, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UploadIdcardComponent } from './upload-idcard.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    declarations: [
        UploadIdcardComponent
    ],
    exports: [UploadIdcardComponent]
})
export class UploadIdcardModule { }
