import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-all-order',
    templateUrl: './all-order.component.html',
    styleUrls: ['./all-order.component.scss']
})
export class AllOrderComponent implements OnInit {

    type: String = 'payment';
    list = { img: '../../../assets/imgs/bag1.png', title: '女士个性标语肩带单肩包时尚便携真皮手提包', price: '3319.00', num: '1', id: 1 };

    constructor(
        public alertController: AlertController,
    ) { }

    ngOnInit() {
    }

    segmentChanged(ev: any) {
        this.type = ev.detail.value;
    }

    cancel() {
        this.presentAlert('此功能正在拼命开发中，请等待。');
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
    }

}
