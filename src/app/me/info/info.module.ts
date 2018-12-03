import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info.routing.module';
import { UploadIdcardModule, UploadCredentialsModule } from '../../components';

import { InfoComponent } from './info.component';
import { SignatureEditComponent } from './signature-edit/signature-edit.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { NameEditComponent } from './name-edit/name-edit.component';
import { BindWechatComponent } from './bind-wechat/bind-wechat.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationUploadComponent } from './authentication-upload/authentication-upload.component';
import { AddressComponent } from './address/address.component';
import { PhoneChangeComponent } from './phone-change/phone-change.component';
import { AddressAddComponent } from './address-add/address-add.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { InputFocusDirectiveModule } from '../../directives';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        InfoRoutingModule,
        UploadIdcardModule,
        UploadCredentialsModule,
        InputFocusDirectiveModule
    ],
    declarations: [
        InfoComponent,
        SignatureEditComponent,
        QrCodeComponent,
        NameEditComponent,
        BindWechatComponent,
        AuthenticationComponent,
        AuthenticationUploadComponent,
        AddressComponent,
        AddressAddComponent,
        PhoneChangeComponent,
        BillListComponent,
        BillDetailComponent
    ]
})
export class InfoModule { }
