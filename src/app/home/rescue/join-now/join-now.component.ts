import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
    selector: 'join-now',
    templateUrl: './join-now.component.html',
    styleUrls: ['./join-now.component.scss']
})
export class JoinNowComponent implements OnInit {

    total: Number = 92;
    isAgreed: Number = 1;
    years: any = 1;
    remHigh: Number = 0;
    addHigh: Number = 1;
    serviceFee: any = 26;
    addRescue = [
        {
            name: '救助内容',
            value: '80种重大疾病'
        },
        {
            name: '最高救助',
            value: '150万元'
        },
        {
            name: '捐助人数',
            value: '2168人'
        },
        {
            name: '加入年龄',
            value: '0-58周岁(不含58周岁)'
        },
        {
            name: '加入人数',
            value: '60246人'
        },
        {
            name: '已捐助金额',
            value: '208万元'
        }
    ];
    btns: Array<object>;
    userName;
    number;

    constructor(
        public alertController: AlertController,
        private router: Router,
    ) { }

    ngOnInit() {
        this.initTotal();
    }

    butClick(btn) {
        console.log(btn);
        this.btns.forEach((bt: any) => {
            bt.noClick = true;
            if (bt.value === btn.value && btn.value !== '自定义') {
                bt.noClick = false;
            }
        });
        if (btn.value !== '自定义') {
            // tslint:disable-next-line:radix
            this.total = parseInt(btn.value) + this.serviceFee;
        }
    }

    agreed() {
        if (this.isAgreed) {
            this.isAgreed = 0;
        } else {
            this.isAgreed = 1;
        }
    }

    remove() {
        if (this.years > 1) {
            this.remHigh = 1;
            this.addHigh = 1;
            // tslint:disable-next-line:radix
            this.years = parseInt(this.years) - 1;
            // tslint:disable-next-line:radix
            this.serviceFee = parseInt(this.serviceFee) - 26;
            this.initTotal();
        } else {
            this.remHigh = 0;
            this.serviceFee = 26;
        }
    }

    add() {
        if (this.years !== 12) {
            this.addHigh = 1;
            this.remHigh = 1;
            // tslint:disable-next-line:radix
            this.years = parseInt(this.years) + 1;
            // tslint:disable-next-line:radix
            this.serviceFee = parseInt(this.serviceFee) + 26;
            this.initTotal();
        } else {
            this.addHigh = 0;
            this.serviceFee = 312;
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
        //                 this.router.navigate(['/success-pay']);
        //             }
        //         }
        //     ];
        //     this.alertMessage(header, message, buttons);
        // } else {
        //     this.presentAlert('请阅读并同意《心安救助基金共约》');
        // }
    }

    initTotal() {
        this.btns = [
            {
                value: '33',
                noClick: true
            },
            {
                value: '66',
                noClick: false
            },
            {
                value: '99',
                noClick: true
            },
            {
                value: '132',
                noClick: true
            },
            {
                value: '165',
                noClick: true
            },
            {
                value: '自定义',
                noClick: true
            }
        ];

        this.total = 66 + this.serviceFee;
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
