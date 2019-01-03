import { Component, OnInit } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { MeService } from '../../me/me.service'
import { AboutService } from '../about.service'
import { apiUrlService } from '../../shared/apiUrl.service'
import { PayComponent } from '../pay/pay.component'
@Component({
    selector: 'app-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
    address : any = {}
    lists : Array<any> = [];
    totalPrice : number = 0;
    id : any = undefined
    count : any = 0
    constructor(
        public modalController: ModalController,
        private _apiUrlService : apiUrlService,
        private _AboutService : AboutService,
        public _MeService : MeService,
        public alertController: AlertController,
        private router: Router,
        private _ActivatedRoute : ActivatedRoute
    ) { }

    ngOnInit() {
        this.getAddressList()
        this._ActivatedRoute.queryParams.subscribe(params=>{
            if(params.id){
                if (typeof(params.id) == 'string'){
                    this.id = [params.id]   
                    this.count = [params.count]
                }else{
                    this.id = params.id
                    this.count = params.count
                } 
                for(let i = 0;i < this.id.length;i++){
                    this.getShopsDetail(this.id[i],this.count[i])
                }
               
            }
        })
    }

    async getShopsDetail(id,count){
        let res = await this._AboutService.getShopDetail(id)
        this.lists.push({
            img : this._apiUrlService.baseUrl + 'public/uploads/' + res.file.savepath + res.file.savename,
            title : res.name,
            num : count,
            price : res.price,
            id : res.id
        })
        this.totalPrice = Number((this.totalPrice + res.price*count ).toFixed(2))
    }

    async getAddressList(){
        let res = await this._MeService.getAddressList()
        let contact_id = JSON.parse(window.localStorage.getItem('userInfo')).contact_id
        this.address = res.find(address=>address.id == contact_id)
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
                text: '下一步',
                handler: () => {
                    
                }
            }
        ];
        this.alertMessage(header, message, buttons);
    }

    async payNow(){
        let cart = []
        for(let i = 0;i < this.id.length;i++){
            cart.push({
                id : this.id[i],
                num : this.count[i]
            })
        }
        const modal = await this.modalController.create({
            component: PayComponent,
            componentProps: { 
                cart: cart,
                contact_id : this.address.id,
                totalPrice : this.totalPrice
            }
          });
        modal.present();
        const { data } = await modal.onDidDismiss();
        if(data){
           if(data.complete){
               this.router.navigate(['/all_order'])
           }
        }
        // let res = await this._AboutService.addOrder([{id:this.id,num:this.count}],this.address.id)

        // console.log(res)
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
