import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { headersToString } from 'selenium-webdriver/http';

@Component({
    selector: 'details-rescue',
    templateUrl: './details-rescue.component.html',
    styleUrls: ['./details-rescue.component.scss']
})
export class DetailsRescueComponent implements OnInit {
    rule1: boolean;
    rule2: boolean;

    constructor(
        private alertController: AlertController
    ) { }

    ngOnInit() {
    }

    async presentAlert(header, message) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: ['好的']
        });

        await alert.present();
    }

    // 救助金说明
    rescueMoneyDes() {
        this.presentAlert(
            '救助金说明',
            `1、救助金由加入本救助基金的人共同捐助而来，最高为150万元。 <br>
            2、救助金补偿原则：如果受助人已通过社保、商业保险等其他途径获得报销或补偿，则本救助基金仅就剩余部分进行救助(需提供发票)<br>
            3、会员人数越多，单次捐助金额越低。`
        );
    }

    // 救助金说明
    joinInDes() {
        this.presentAlert(
            '加入说明',
            `1、26元/年服务费，主要用于平台运营、客服、医疗资源对接等方面。服务费到期后不续交，既失去服务及救助资格。<br>
            2、33元存入您在本救助基金的账户中，90天后生效。<br>
            （1）该账户资金独立存管，全部用于会员救助本身，不能被用于盈利。<br>
            （2）一旦发生救助时间，将从该账户中进行扣除。<br>
            （3）账户余额<33元，将失去救助资格。`
        );
    }
}
