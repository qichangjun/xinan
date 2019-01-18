import { Component, OnInit,Input } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AboutService } from '../about.service'
import { Wechat } from '@ionic-native/wechat/ngx';

declare let cordova;
@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
    @Input() orderInfo : any;
    constructor(
        private wechat: Wechat,
        private _AboutService : AboutService,
        public _ModalController : ModalController,
        public alertController: AlertController,
        private router: Router,

    ) { }

    ngOnInit() {
        console.log(this.orderInfo)
    }

    async aliPay() {
        let payInfo = await this._AboutService.Pay(this.orderInfo.id)
        let _self = this
        cordova.plugins.alipay.payment(payInfo.res,async function success(result){    
            if (result.resultStatus == 9000){
                alert('支付成功')
                //验证用户认证状态
                _self._ModalController.dismiss({
                    complete : true 
                })
            }else{
                alert('支付失败')
                _self._ModalController.dismiss({
                    complete : true 
                })
            }
        },function error(error){
            alert(error)
        });
    }

    async weChatPay(){
        let payInfo = await this._AboutService.weChatPay(this.orderInfo.id)
        let prepayid = payInfo.package.replace('prepay_id=','')
        console.log(prepayid)
        this.wechat.sendPaymentRequest({
            partnerid: payInfo.mch_id, // merchant id
            prepayid: prepayid, // prepay id
            noncestr: payInfo.nonceStr, // nonce
            timestamp: payInfo.timeStamp, // timestamp
            sign: payInfo.paySign, // signed string
        }).then((res: any) => {
            this._ModalController.dismiss({
                complete : true 
            })
        }).catch((error: any) => {
            alert("支付失败:" + error)
        });
    }
}
