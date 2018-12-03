import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UploadPicturesComponent } from './upload-pictures.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    declarations: [
        UploadPicturesComponent
    ],
    exports: [UploadPicturesComponent]
})
export class UploadPicturesModule { }
