import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
    selector: 'app-card-rescue',
    templateUrl: './card-rescue.component.html',
    styleUrls: ['./card-rescue.component.scss']
})
export class CardRescueComponent implements OnInit {

    isShow = false;
    total: Number = 59;
    isAgreed: Number = 0;
    price;
    btns = [
        {
            value: '33',
            noClick: true
        },
        {
            value: '66',
            noClick: false
        },
        {
            value: '99',
            noClick: true
        },
        {
            value: '132',
            noClick: true
        },
        {
            value: '165',
            noClick: true
        }
    ];

    constructor(
        private router: Router,
        public alertController: AlertController,
    ) { }

    ngOnInit() {
    }

    agreed() {
        if (this.isAgreed) {
            this.isAgreed = 0;
        } else {
            this.isAgreed = 1;
        }
    }

    butClick(btn) {
        console.log(btn);
        this.btns.forEach((bt: any) => {
            bt.noClick = true;
            if (bt.value === btn.value) {
                bt.noClick = false;
            }
        });
        // tslint:disable-next-line:radix
        this.total = parseInt(btn.value) + 26;
    }

    alert() {
        this.router.navigate(['/relatives']);
    }

    alertMes() {
        if (this.isAgreed) {
            const header = '提示！';
            const message = '您的申请已经提交，现阶段仅向定向通道开放，请耐心等待。';
            const buttons = [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: '下一步',
                    handler: () => {
                        this.presentAlert('此功能正在拼命开发中，请等待。');
                        // this.router.navigate(['/interests/success/2']);
                    }
                }
            ];
            this.alertMessage(header, message, buttons);
        } else {
            this.presentAlert('请阅读并同意《心安救助基金公约》《详细规则》');
        }
    }

    async alertMessage(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
    }

}
