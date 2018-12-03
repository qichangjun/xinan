import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

    lists = [
        { img: '../../../assets/imgs/bag1.png', title: '女士个性标语肩带单肩包时尚便携真皮手提包', price: '3319.00', num: '1', id: 1 },
        { img: '../../../assets/imgs/bag1.png', title: '女士个性标语肩带单肩包时尚便携真皮手提包', price: '3319.00', num: '1', id: 1 }
    ];

    constructor(
        public alertController: AlertController,
        private router: Router,
    ) { }

    ngOnInit() {
    }
    alertMes() {
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
                    this.router.navigate(['/pay']);
                }
            }
        ];
        this.alertMessage(header, message, buttons);
    }

    async alertMessage(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }
}
