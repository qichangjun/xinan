import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
    suggestion = '';

    constructor(
        private alertCtrl: AlertController
    ) { }

    ngOnInit() {
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

    // 提交反馈
    up() {
        // console.log('提交反馈: ', this.suggestion);
        this.alertMes();
    }

}
