import { Component, OnInit,ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AboutService} from '../about.service';
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

    cancel() {
        this.presentAlert('此功能正在拼命开发中，请等待。');
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
    }

    pay(){
        
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
