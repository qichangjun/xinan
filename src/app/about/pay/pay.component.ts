import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

    constructor(
        public alertController: AlertController,
        private router: Router,

    ) { }

    ngOnInit() {
    }
    alertMes() {
        // if (this.isAgreed) {

        const header = '提示！';
        const message = '商城尚未开放购买权限，请耐心等待。';
        const buttons = [
            {
                text: '取消',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                }
            }, {
                text: '返回',
                // role: 'cancel',
                handler: () => {
                    this.router.navigate(['/all_order']);
                }
            }
        ];
        this.alertMessage(header, message, buttons);
        // } else {
        //     this.presentAlert('请阅读并同意《心安救助基金公约》');
        // }
        // }
    }

    // async presentAlert(message) {
    //     const alert = await this.alertController.create({
    //         message,
    //         buttons: ['好的']
    //     });

    //     await alert.present();
    // }

    async alertMessage(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }

}
