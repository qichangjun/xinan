import { Component, OnInit,Input } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AboutService } from '../about.service'
declare let cordova;
@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
    @Input() orderInfo : any;
    constructor(
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
                alert(result.memo)
                _self._ModalController.dismiss({
                    complete : true 
                })
            }
        },function error(error){
            alert(error)
        });
    }
}
