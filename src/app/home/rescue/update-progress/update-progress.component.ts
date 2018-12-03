import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-update-progress',
    templateUrl: './update-progress.component.html',
    styleUrls: ['./update-progress.component.scss']
})
export class UpdateProgressComponent implements OnInit {

    progress = '';

    constructor(
        private alertCtrl: AlertController
    ) { }

    ngOnInit() {
    }

    goDetail() {

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

    // 提交进展
    up() {
        this.alertMes();
    }

}
