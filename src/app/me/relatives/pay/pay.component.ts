import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

    params: any;
    relatives = [];

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private alertCtrl: AlertController
    ) {
        console.log(this.activeRoute.queryParams['value']);
        const params = this.activeRoute.queryParams['value'];
        this.params = {
            type: params.type, // charge:亲友充值  add:添加亲友
            service_type: params.service_type, // 1:基金 2:年费
            relatives: JSON.parse(params.relatives)
        };

        this.relatives = this.params.relatives;
    }

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
