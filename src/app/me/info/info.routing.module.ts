import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
    { path: '', component: InfoComponent },
    { path: 'signature-edit', component: SignatureEditComponent }, // 个人简介修改
    { path: 'qr-code', component: QrCodeComponent }, // 我的二维码
    { path: 'name-edit', component: NameEditComponent }, // 昵称修改
    { path: 'bind-wechat', component: BindWechatComponent }, // 绑定微信
    { path: 'authentication', component: AuthenticationComponent }, // 身份认证
    { path: 'auth-upload', component: AuthenticationUploadComponent }, // 身份认证上传
    { path: 'address', component: AddressComponent }, // 收获地址
    { path: 'address-add', component: AddressAddComponent }, // 添加收货地址
    { path: 'phone-change/:oldphone', component: PhoneChangeComponent }, // 更改绑定手机（手机号已绑定）
    { path: 'bill-list/:type', component: BillListComponent }, // 账单明细
    { path: 'bill-detail/:type/:id', component: BillDetailComponent }, // 账单详情
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfoRoutingModule { }
