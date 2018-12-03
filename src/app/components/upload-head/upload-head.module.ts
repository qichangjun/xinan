import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UploadHeadComponent } from './upload-head.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    declarations: [
        UploadHeadComponent
    ],
    exports: [UploadHeadComponent]
})
export class UploadHeadModule { }
