import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AboutService} from '../about.service';
import { ShopCardData } from '../../common/interface';

@Component({
    selector: 'app-shopping-card',
    templateUrl: './shopping-card.component.html',
    styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {

    years: any = 1;
    remHigh: Number = 0;
    addHigh: Number = 1;
    isAllSelected: Number = 1;
    shopCardData;

    constructor(
        private _aboutService : AboutService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getShoCardData()
        this.shopCardData = Array.from({ length: 4 }, (_, k) => createNewShop(k + 1));
    }

    async getShoCardData(){
        let res = await this._aboutService.getShoCardData()
        console.log(res)
    }

    remove() {
        if (this.years > 1) {
            this.remHigh = 1;
            this.addHigh = 1;
            // tslint:disable-next-line:radix
            this.years = parseInt(this.years) - 1;
        } else {
            this.remHigh = 0;
        }
    }

    add() {
        if (this.years !== 12) {
            this.addHigh = 1;
            this.remHigh = 1;
            // tslint:disable-next-line:radix
            this.years = parseInt(this.years) + 1;
        } else {
            this.addHigh = 0;
        }
    }

    selected(shop?) {
        if (shop) {
            shop.isSelected = shop.isSelected ? 0 : 1;
        } else {
            this.isAllSelected = this.isAllSelected ? 0 : 1;
        }
    }

    settlement() {
        this.router.navigate(['/wait_pay/1']);
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
