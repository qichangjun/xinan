import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { XAGivingData } from '../../../common/interface';

@Component({
    selector: 'app-donation',
    templateUrl: './donation.component.html',
    styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {

    items;
    price;
    total: Number = 92;
    isAgreed: Number = 0;
    btns = [
        {
            value: '1',
            noClick: true
        },
        {
            value: '2',
            noClick: false
        },
        {
            value: '5',
            noClick: true
        },
        {
            value: '10',
            noClick: true
        },
        {
            value: '20',
            noClick: true
        },
        {
            value: '50',
            noClick: true
        }
    ];

    constructor(
        public alertController: AlertController,
        private router: Router,
    ) { }

    ngOnInit() {
        this.items = Array.from({ length: 1 }, (_, k) => createNewRescue(k + 1));
    }

    butClick(btn) {
        console.log(btn);
        this.btns.forEach((bt: any) => {
            bt.noClick = true;
            if (bt.value === btn.value) {
                bt.noClick = false;
            }
        });
        // tslint:disable-next-line:radix
        this.total = parseInt(btn.value) + 26;
    }

    agreed() {
        if (this.isAgreed) {
            this.isAgreed = 0;
        } else {
            this.isAgreed = 1;
        }
    }

    alertMes() {
        this.presentAlert('此功能正在拼命开发中，请等待。');
        // if (this.isAgreed) {
        //     const header = '提示！';
        //     const message = '您的申请已经提交，现阶段仅向定向通道开放，请耐心等待。';
        //     const buttons = [
        //         {
        //             text: '取消',
        //             role: 'cancel',
        //             cssClass: 'secondary',
        //             handler: (blah) => {
        //                 console.log('Confirm Cancel: blah');
        //             }
        //         }, {
        //             text: '下一步',
        //             handler: () => {
        //                 this.router.navigate(['/help_success']);
        //             }
        //         }
        //     ];
        //     this.alertMessage(header, message, buttons);
        // } else {
        //     this.presentAlert('请阅读并同意《乐捐发起条款》《发起人承诺书》');
        // }
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
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

function createNewRescue(id: number): XAGivingData {

    return {
        id: id.toString(),
        title: '林慧光',
        image: '../../assets/imgs/shang_img2@2x.png',
        data: [
            {
                id: 'yjje',
                name: '已捐金额',
                value: 26560
            },
            {
                id: 'jglj',
                name: '机构领捐',
                value: 26560
            },
            {
                id: 'sxzj',
                name: '所需资金',
                value: 26560
            },
            {
                id: 'cyrs',
                name: '参与人数',
                value: 26560
            }
        ]
    };
}
