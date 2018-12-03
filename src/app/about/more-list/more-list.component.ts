import { Component, OnInit } from '@angular/core';
import { ShopData } from '../../common/interface';

@Component({
    selector: 'app-more-list',
    templateUrl: './more-list.component.html',
    styleUrls: ['./more-list.component.scss']
})
export class MoreListComponent implements OnInit {

    shopData;

    constructor() {
    }

    ngOnInit() {
        this.shopData = Array.from({ length: 10 }, (_, k) => createShopData(k + 1));
    }

}

function createShopData(id: number): ShopData {

    return {
        id: id.toString(),
        imageurl: '../../assets/imgs/img_product.png',
        title: '努比亚（nubia）Z17 无边框 曜石黑 6GB+64GB 全网通',
        price: '￥2,299.00',
    };
}
