import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UploadCredentialsComponent } from './upload-credentials.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    declarations: [
        UploadCredentialsComponent
    ],
    exports: [UploadCredentialsComponent]
})
export class UploadCredentialsModule { }
