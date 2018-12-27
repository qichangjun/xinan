import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
    selector: 'app-card-member',
    templateUrl: './card-member.component.html',
    styleUrls: ['./card-member.component.scss']
})
export class CardMemberComponent implements OnInit {

    total: Number = 26;
    serviceFee: any = 26;
    years: any = 1;
    userName: String;
    number: Number;
    isShow = true;
    isAgreed: Number = 0;

    constructor(
        private router: Router,
        public alertController: AlertController,
    ) { }

    ngOnInit() {
    }

    submit() {
        this.isShow = false;
    }

    agreed() {
        if (this.isAgreed) {
            this.isAgreed = 0;
        } else {
            this.isAgreed = 1;
        }
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
                        // this.router.navigate(['/interests/success/1']);
                    }
                }
            ];
            this.alertMessage(header, message, buttons);
        } else {
            this.presentAlert('请阅读并同意《心安救助基金公约》《详细规则》');
        }
    }

    alert() {
        this.router.navigate(['/relatives']);
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
