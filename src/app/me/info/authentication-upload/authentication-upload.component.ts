import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-authentication-upload',
    templateUrl: './authentication-upload.component.html',
    styleUrls: ['./authentication-upload.component.scss']
})
export class AuthenticationUploadComponent implements OnInit {

    isShowIdcardBox = false;
    isShowCredentialsBox = false;

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

}
