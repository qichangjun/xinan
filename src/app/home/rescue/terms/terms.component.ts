import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { JoinNowService } from '../join-now/join-now.service'
import { Alipay } from '@ionic-native/alipay/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
declare let cordova;
@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

    isAgreed: Number = 1;
    userName:string = ''
    number:string = ''
    constructor(
        public toastCtrl: ToastController,
        private router: Router,
        private alipay: Alipay,
        public _joinNowService : JoinNowService,
        public alertController: AlertController,
        public activeRoute: ActivatedRoute
    ) {
        // console.log(this.navParams.get('userName'))
        this.activeRoute.queryParams.subscribe(
            (params) => {
               console.log(params)
                this.userName = params.userName
                this.number = params.number 
            });
     }

    ngOnInit() {
        
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


    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
    }

    async aliPay(){
        try{
            let res = await this._joinNowService.join(this.userName,this.number)
            let orderId = res.id
            let orderInfo = await this._joinNowService.aliPayOrder(orderId)
            cordova.plugins.ali.pay(orderInfo.res,function success(result){    
                if (result.resultStatus == 9000){
                    //验证用户认证状态
                    this.router.navigate(['/tabs/(me:me)']);
                }else{
                    alert(result.memo)
                }
            },function error(error){
                alert(error)
            });
        }catch(err){
            this.router.navigate(['/auth/sign-in']);
            this.showToast('请先登陆')
        }
    }
}
