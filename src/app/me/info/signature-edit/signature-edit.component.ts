import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { updateCurrentUserInfo } from '../../../shared/graphql-tag';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-signature-edit',
    templateUrl: './signature-edit.component.html',
    styleUrls: ['./signature-edit.component.scss']
})
export class SignatureEditComponent implements OnInit {
    signature = {
        id: null,
        relationId: 5,
        value: ''
    };

    constructor(
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private apollo: Apollo,
        private router: Router,
        private activedRoute: ActivatedRoute
    ) {
        const param = this.activedRoute.queryParams['value'];
        this.signature = {
            id: param.id === null ? null : Number(param.id),
            relationId: Number(param.relationId),
            value: param.value
        };
    }

    ngOnInit() {
    }

    async showToast(msg: string, pos: any = 'bottom') {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: pos,
            cssClass: 'auth-toast',
            translucent: true
        });
        toast.present();
    }

    async showErrorToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'middle',
            cssClass: 'auth-error-toast',
            translucent: true
        });
        toast.present();
    }

    async alertMessage(header, message, buttons) {
        const alert = await this.alertCtrl.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }

    alertMes() {
        this.alertMessage('提示', '感谢您的支持，您尚未获得此功能的使用权限，请耐心等待平台开放', [
            {
                text: '好的',
                role: 'cancel',
                cssClass: 'secondary'
            }]);
    }

    // 提交
    up() {
        if (this.signature.value === '') {
            this.showErrorToast('请输入个人简介');
        } else {
            this.apollo.mutate({
                mutation: updateCurrentUserInfo,
                variables: {
                    updateCurrentUserInput: {
                        infoKVs: [{
                            key: this.signature.id,
                            value: this.signature.value,
                            relationId: this.signature.relationId
                        }]
                    }
                }
            }).subscribe((val) => {
                console.log(val);
                if (val && val.data && val.data.updateCurrentUserInfo) {
                    const send = val.data.updateCurrentUserInfo;
                    if (send.code === 200) {
                        this.back();
                        this.showToast('个人简介修改成功');
                    } else {
                        this.showErrorToast(send.message);
                    }
                }
            });
        }
    }

    clear() {
        this.signature = {
            id: null,
            relationId: 5,
            value: ''
        };
    }

    back() {
        // 重置数据
        this.clear();
        this.router.navigate(['/tabs']);
    }

}
