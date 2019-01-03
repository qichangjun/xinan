import { Component, OnInit,ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AboutService} from '../about.service';
declare let cordova;
@Component({
    selector: 'app-all-order',
    templateUrl: './all-order.component.html',
    styleUrls: ['./all-order.component.scss']
})
export class AllOrderComponent implements OnInit {
    page = 1;
    totalCount = 0;
    type: String = 'payment';
    orderLists : Array<any> = [];
    @ViewChild('infiniteScroll') 
    infiniteScroll
    list = { img: '../../../assets/imgs/bag1.png', title: '女士个性标语肩带单肩包时尚便携真皮手提包', price: '3319.00', num: '1', id: 1 };

    constructor(
        public _AboutService : AboutService,
        public alertController: AlertController,
    ) { }

    ngOnInit() {
        this.getAllOrder()
    }

    async getAllOrder(type?){
        let res = await this._AboutService.getAllOrder(this.type,this.page)
        if(type == 'changePage'){
            this.orderLists = this.orderLists.concat(res.order)
        }else{
            this.orderLists = res.order
        }
        this.page = res.pageinfo.page
        this.totalCount = res.pageinfo.rowCount
        if(this.orderLists.length < this.totalCount){
            this.infiniteScroll.disabled = false 
        }else{
            this.infiniteScroll.disabled = true 
        }
    }

    segmentChanged(ev: any) {
        this.type = ev.detail.value;
        this.getAllOrder()
    }

    cancel(id) {
        const header = '提示！';
        const message = '确定要取消该订单吗？';
        const buttons = [
            {
                text: '我再看看',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                }
            }, {
                text: '是的',
                handler: async () => {
                    await this._AboutService.cancelOrder(id)
                    this.getAllOrder()
                }
            }
        ];
        this.alertMessage(header, message, buttons);      
    }

    async alertMessage(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
    }

    async pay(id){
        let payInfo = await this._AboutService.Pay(id)
        let _self = this 
        cordova.plugins.ali.pay(payInfo.res,async function success(result){    
            if (result.resultStatus == 9000){
                //验证用户认证状态
                alert('支付成功')
                _self.getAllOrder()
            }else{
                alert(result.memo)
            }
        },function error(error){
            alert(error)
        });
    }

    loadData(event) {
        setTimeout(() => {
            event.target.complete();
            if (this.orderLists.length >= this.totalCount) {
                event.target.disabled = true;
            }
            this.getAllOrder('changePage')
        }, 500);
    }
}
