import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { WaitData, OrderData } from '../../common/interface';

@Component({
    selector: 'app-wait-pay',
    templateUrl: './wait-pay.component.html',
    styleUrls: ['./wait-pay.component.scss']
})
export class WaitPayComponent implements OnInit {

    lists = [
        { img: '../../../assets/imgs/bag1.png', title: '女士个性标语肩带单肩包时尚便携真皮手提包', price: '3319', num: '1', id: 1 },
        { img: '../../../assets/imgs/bag1.png', title: '女士个性标语肩带单肩包时尚便携真皮手提包', price: '3319', num: '1', id: 1 }
    ];
    data;
    waitPayData;
    orderDetailData;
    cid;

    constructor(
        public alertController: AlertController,
        private router: Router,
        public activeRoute: ActivatedRoute,
    ) {
        this.activeRoute.params.subscribe(
            (params) => {
                this.cid = params.id / 1;

            });
    }

    public async ngOnInit(): Promise<void> {
        if (this.cid === 1) {
            this.waitPayData = Array.from({ length: 1 }, (_, k) => createWaitPay(k));
            this.data = this.waitPayData;
        } else {
            this.orderDetailData = Array.from({ length: 1 }, (_, k) => createOrderDetail(k));
            this.data = this.orderDetailData;
        }
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
                text: '返回商城',
                handler: () => {
                    this.router.navigate(['/tabs']);
                }
            }
        ];
        this.alertMessage(header, message, buttons);
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

    cancelMes(name) {
        if (name === '查看物流') {
            this.router.navigate(['/logistics_detail']);
        } else {
            // this.router.navigate(['/card']);
            this.presentAlert('此功能正在拼命开发中，请等待。');
        }
    }

}

function createWaitPay(id: number): WaitData {
    const obj = {
        id: id.toString(),
        name: '待支付(元)',
        title: '待支付',
        lable: '请于01小时32分钟14秒内完成支付',
        content: '3329.00',
        order: '',
        orderTime: '',
        buttonA: '取消订单',
        buttonB: '支付',
    };
    return obj;
}

function createOrderDetail(id: number): OrderData {
    const obj = {
        id: id.toString(),
        name: '',
        title: '订单详情',
        lable: '物流单号：5484656589562',
        content: '待收货',
        order: '付款时间',
        orderTime: '2018.05.06 13:58',
        buttonA: '查看物流',
        buttonB: '确认收货',
    };
    return obj;
}
