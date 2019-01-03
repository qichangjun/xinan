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
    @Input() cart: any;
    @Input() contact_id : any;
    @Input() totalPrice : any = 0;
    orderInfo : any = {}
    constructor(
        private _AboutService : AboutService,
        public _ModalController : ModalController,
        public alertController: AlertController,
        private router: Router,

    ) { }

    ngOnInit() {
      this.addOrder() 
    }

    async addOrder(){
        this.orderInfo = await this._AboutService.addOrder(this.cart,this.contact_id)
    }

    async aliPay() {
        let payInfo = await this._AboutService.Pay(this.orderInfo.id)
        cordova.plugins.ali.pay(payInfo.res,async function success(result){    
            if (result.resultStatus == 9000){
                this.showToast('支付成功')
                //验证用户认证状态
                this._ModalController.dismiss({
                    complete : true 
                })
            }else{
                alert(result.memo)
            }
        },function error(error){
            alert(error)
        });
    }
}
