import { Component, OnInit } from '@angular/core';
import { AlertController,NavController,NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { JoinNowService } from './join-now.service';
import { Alipay } from '@ionic-native/alipay/ngx';
import { ToastController } from '@ionic/angular';
declare let cordova;
@Component({
    selector: 'join-now',
    templateUrl: './join-now.component.html',
    styleUrls: ['./join-now.component.scss']
})
export class JoinNowComponent implements OnInit {

    total: Number = 26;
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
        public _joinNowService : JoinNowService,
        public alertController: AlertController,
        private alipay: Alipay,
        private router: Router,
        public toastCtrl: ToastController,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        if(!window.localStorage.getItem('token')){
            this.navCtrl.navigateForward(['/auth/sign-in']);
            this.showToast('请先登陆')
            return 
        }
        this.initTotal();
    }

    async showToast(msg: string, pos: any = 'bottom') {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: pos,
            cssClass: 'auth-toast',
            translucent: true
        });
        toast.present();
    }

    butClick(btn) {
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

        this.total = 0 + this.serviceFee;
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

    async gotoTerms(){
        this.userName = this.userName || ''
        this.number = this.number || ''
        let res = await this.navCtrl.navigateForward('/terms?userName=' + this.userName + '&number=' + this.number)
    }

    async aliPay(){
        try{
            let _self = this
            let orderInfo = await this._joinNowService.join(this.userName,this.number)
            cordova.plugins.alipay.payment(orderInfo.res,async function success(result){    
                if (result.resultStatus == 9000){
                    _self.showToast('交易成功，若认证状态未改变请稍等后重新登陆')
                    //验证用户认证状态
                    let userInfo = await _self._joinNowService.checkUserInfo()
                    localStorage.setItem('userInfo', JSON.stringify(userInfo.user));          
                    _self.router.navigate(['/tabs/(me:me)']);
                }else{
                    alert(result.memo)
                }
            },function error(error){
                alert(error)
            });
        }catch(err){
            alert(err)
            this.router.navigate(['/auth/sign-in']);
            this.showToast('请先登陆')
        }
    }

}
