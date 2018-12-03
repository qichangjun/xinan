import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-add-friends',
    templateUrl: './add-friends.component.html',
    styleUrls: ['./add-friends.component.scss']
})
export class AddFriendsComponent implements OnInit {

    userInfo: any = {
        imgUrl: '../../../assets/imgs/tx.png',
        title: '刘会亮',
        time: '身份证号：3505 **** **** 6577'
    };
    isAgreed: Number = 1;
    title: String = '大病无情人间有爱';
    number: Number = 100000;
    btns: Array<object>;
    type: String;
    text: String = '救助';

    constructor(
        public alertController: AlertController,
        public activeRoute: ActivatedRoute,
    ) {
        this.activeRoute.params.subscribe(
            (params) => {
                this.type = params.id;
                if (this.type === 'lj') {
                    this.text = '乐捐';
                }
            });
    }

    ngOnInit() {
        this.btns = [
            {
                value: '助学',
                noClick: true
            },
            {
                value: '助残',
                noClick: false
            },
            {
                value: '意外',
                noClick: true
            }
        ];
    }

    agreed() {
        if (this.isAgreed) {
            this.isAgreed = 0;
        } else {
            this.isAgreed = 1;
        }
    }

    butClick(btn) {
        console.log(btn);
        this.btns.forEach((bt: any) => {
            bt.noClick = true;
            if (bt.value === btn.value) {
                bt.noClick = false;
            }
        });
    }

    alertMes() {
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
