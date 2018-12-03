import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ShopData, CardShops } from '../common/interface';
@Component({
    selector: 'app-about',
    templateUrl: 'about.page.html',
    styleUrls: ['about.page.scss']
})
export class AboutPage implements OnInit {

    @ViewChild('slides') slides: Slides;
    imgs = [
        '../../assets/imgs/img_banner_shop.png',
        '../../assets/imgs/img_01@3x.png',
        '../../assets/imgs/img_jifen@2x.png'
    ];
    cShops;

    constructor(
        private router: Router,
        public alertController: AlertController,

    ) {
        this.cShops = Array.from({ length: 2 }, (_, k) => createCardShop(k + 1));
    }

    ngOnInit() {
    }

    alertMes() {
        this.router.navigate(['/more_list']);
    }

    async presentAlert(header, message) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: ['好的'],
            cssClass: 'alertCustomCss'
        });
        await alert.present();
    }

    class() {
        this.presentAlert(
            '提示',
            `感谢您的支持，您尚未获得此功能的使用权限，请耐心等待平台开放。`
        );
    }

}

function createCardShop(id: number): CardShops {
    const names = ['数码3C', '日用商品'];
    const shopData = Array.from({ length: 4 }, (_, k) => createShopData(k + 1));

    return {
        id: id.toString(),
        url: '',
        title: names[id - 1],
        data: shopData,
    };
}

function createShopData(id: number): ShopData {

    return {
        id: id.toString(),
        imageurl: '../../assets/imgs/img_product.png',
        title: '努比亚（nubia）Z17 无边框 曜石黑 6GB+64GB 全网通',
        price: '￥2,299.00',
    };
}
