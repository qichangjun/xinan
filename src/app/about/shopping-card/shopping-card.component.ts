import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AboutService} from '../about.service';
import { ShopCardData } from '../../common/interface';
import { apiUrlService } from '../../shared/apiUrl.service'
import { ModalController } from '@ionic/angular';
import { WaitPayComponent } from '../wait-pay/wait-pay.component';
@Component({
    selector: 'app-shopping-card',
    templateUrl: './shopping-card.component.html',
    styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {
    shopCardData : any = [];

    constructor(
        public modalController: ModalController,
        public _apiUrlService : apiUrlService,
        private _aboutService : AboutService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getShoCardData()
    }

    async getShoCardData(){
        let res = await this._aboutService.getShoCardData()
        this.shopCardData = res.cartList
        this.shopCardData.map(c=>c.isSelected = true)
    }

    remove(shop) {
        if (shop.num > 1) {    
            shop.num = parseInt(shop.num) - 1;
        } 
    }

    add(shop) {
        if (shop.num !== 12) {
            shop.num = parseInt(shop.num) + 1;
        } else {
        }
    }

    async settlement() {
        await this._aboutService.cleanShopCart()
        let id = this.shopCardData.filter(shop=>shop.isSelected).map(shop=>shop.product_id)
        let count = this.shopCardData.filter(shop=>shop.isSelected).map(shop=>shop.num)
        this.router.navigate(['/confirm_order'],{queryParams:{id:id,count:count}})
    }

    sumTotalCount(){
        let sum : any = 0
        this.shopCardData.filter(shop=>shop.isSelected).forEach(shop => {
            sum = Number(sum + shop.num*shop.product.price)
        });
        return sum.toFixed(2)
    }

    disableSettlement(){
        return !this.shopCardData.find(shop=>shop.isSelected)
    }

    isAllSelected(){
        return !(this.shopCardData.find(shop=>!shop.isSelected))
    }

}

function createNewShop(id: number): ShopCardData {
    const obj = {
        id: id.toString(),
        title: '女士个性标语肩带单肩包时尚便 携真皮手提包',
        imageurl: '../../assets/imgs/bag1.png',
        discountPrice: '￥3319.00',
        originalPrice: '商城价: 3319.00',
        isSelected: 1,
        isFailure: 0
    };
    if (id === 1) {
        obj.originalPrice = '';
    } else if (id === 3) {
        obj.isSelected = 0;
    } else if (id === 4) {
        obj.isFailure = 1;
    }

    return obj;
}
