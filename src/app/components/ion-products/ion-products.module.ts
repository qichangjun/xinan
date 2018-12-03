import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonProductsComponent } from './ion-products.component';

@NgModule({
    declarations: [IonProductsComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule
    ],
    exports: [IonProductsComponent]
})
export class IonProductsModule {

}
