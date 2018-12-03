import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';

import { updateCurrentUserInfo } from '../../../shared/graphql-tag';

@Component({
    selector: 'app-name-edit',
    templateUrl: './name-edit.component.html',
    styleUrls: ['./name-edit.component.scss']
})
export class NameEditComponent implements OnInit {
    name;
    nickname = {
        id: null,
        relationId: 1,
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
        this.nickname = {
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

    // 提交
    up() {
        if (this.nickname.value === '') {
            this.showErrorToast('请输入昵称');
        } else {
            this.apollo.mutate({
                mutation: updateCurrentUserInfo,
                variables: {
                    updateCurrentUserInput: {
                        infoKVs: [{
                            key: this.nickname.id,
                            value: this.nickname.value,
                            relationId: this.nickname.relationId
                        }]
                    }
                }
            }).subscribe((val) => {
                console.log(val);
                if (val && val.data && val.data.updateCurrentUserInfo) {
                    const send = val.data.updateCurrentUserInfo;
                    if (send.code === 200) {
                        this.back();
                        this.showToast('昵称修改成功');
                    } else {
                        this.showErrorToast(send.message);
                    }
                }
            });
        }
    }

    back() {
        // 重置数据
        this.router.navigate(['/tabs']);
    }
}
