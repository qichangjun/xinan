import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
    selector: 'app-fill-infomation',
    templateUrl: './fill-infomation.component.html',
    styleUrls: ['./fill-infomation.component.scss']
})
export class FillInfomationComponent implements OnInit {

    service_type = 1; // 服务类型 1:心安全民大病救助基金 2:心安救平台服务年费
    count = 1; // 亲友数
    relativeList = [ // 亲友资料数据
        {
            id: 1,
            name: '',
            identityNumber: '',
            year: 1,
            money: '',
            isShow: false
        }
    ];

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController
    ) {
        this.activeRoute.params.subscribe(
            (params) => {
                this.service_type = params.service;
            }
        );
    }

    ngOnInit() {
    }

    async showErrorToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle',
            cssClass: 'auth-error-toast',
            translucent: true
        });
        toast.present();
    }

    async alertMessage(header, message, buttons, cssClass) {
        const alert = await this.alertCtrl.create({
            header,
            message,
            buttons,
            cssClass
        });

        await alert.present();
    }

    // 添加亲友
    addNewRelative() {
        this.count++;

        this.relativeList.push(
            {
                id: this.count,
                name: '',
                identityNumber: '',
                year: 1,
                money: '',
                isShow: false
            }
        );

        console.log(this.relativeList);
    }

    // 删除添加的亲友
    removeRelative(relative) {
        this.count--;
        const index = this.relativeList.indexOf(relative);
        if (index > -1) {
            this.relativeList.splice(index, 1);
        }
    }

    // 更改年限
    yearChange(data, dir) {
        // dir 1: 加一  -1: 减一
        if (data.year === 1 && dir === -1) {
            return;
        } else {
            data.year = data.year + dir;
        }

    }

    // 确认用户资料
    confirm() {
        let check = false;
        for (let i = 0, len = this.relativeList.length; i < len; i++) {
            if (this.relativeList[i].name !== '' && this.relativeList[i].identityNumber !== '') {
                check = true;
            } else {
                check = false;
                continue;
            }
        }

        if (check) {
            let content = '';
            for (let i = 0, len = this.relativeList.length; i < len; i++) {
                const item = this.relativeList[i];
                content += `<div class='confirm-item'>
                    <p>姓名：${item.name}</p>
                    <p>身份证号：${item.identityNumber}</p>
                </div>`;
            }

            this.alertMessage('请确认身份信息准确无误',
                `<div class='confirm-list'>
                    ${content}
                </div>`,
                [
                    {
                        text: '取消',
                        role: 'cancel',
                    }, {
                        text: '确定',
                        handler: () => {
                            this.router.navigate(['/relatives/pay'],
                                {
                                    queryParams:
                                    {
                                        type: 'add',
                                        service_type: this.service_type,
                                        relatives: JSON.stringify(this.relativeList)
                                    }
                                });
                        }
                    }
                ],
                'add-relatives-confirm-alert'
            );
        } else {
            this.showErrorToast('请完善必填项');
        }
    }

}
