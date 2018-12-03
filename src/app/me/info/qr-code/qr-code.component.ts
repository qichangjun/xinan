import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-qr-code',
    templateUrl: './qr-code.component.html',
    styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
    isShare = false;
    cons = [
        { imgUrl: '../../../../assets/icon/weixin.png', title: '微信' },
        { imgUrl: '../../../../assets/icon/friend.png', title: '朋友圈' },
        { imgUrl: '../../../../assets/icon/qq.png', title: 'QQ' },
        { imgUrl: '../../../../assets/icon/qqspace.png', title: 'QQ空间' },
        { imgUrl: '../../../../assets/icon/weibo.png', title: '微博' },
        { imgUrl: '../../../../assets/icon/pass.png', title: '分享口令' },
        { imgUrl: '../../../../assets/icon/code.png', title: '二维码' },


    ];
    constructor(
        public alertController: AlertController,

    ) { }

    ngOnInit() {
    }
    alertMes() {
        this.presentAlert('感谢您的支持，您尚未获得此功能的使用权限，请耐心等待平台开放');
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
    }
    share() {
        this.isShare = !this.isShare;
    }
}
