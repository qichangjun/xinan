import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
    selector: 'app-fond',
    templateUrl: './fond.page.html',
    styleUrls: ['./fond.page.scss']
})
export class FondPage implements OnInit {

    constructor(
        public alertController: AlertController,
    ) { }

    ngOnInit() {
    }

    alert() {
        this.presentAlert('感谢您的支持，您尚未获得此功能的使用权限，请耐心等待平台开放。');
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
    }

}
