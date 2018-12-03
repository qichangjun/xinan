import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScroll } from '@ionic/angular';

import { ShopData } from '../../common/interface';
@Component({
    selector: 'app-classify',
    templateUrl: './classify.component.html',
    styleUrls: ['./classify.component.scss']
})
export class ClassifyComponent implements OnInit {

    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

    categories: Array<any> = [];
    selectedMenuTarget: any;
    products: Array<any> = [];
    hasmore = true;
    islock = false;
    params = {
        favoritesId: 0,
        pageNo: 1
    };

    constructor(
    ) { }

    ngOnInit() {
        this.getCategories();
        this.doInfinite();
    }

    loadData(event) {
        setTimeout(() => {
            const arr = Array.from({ length: 6 }, (_, k) => createShopData(k + 1));
            event.target.complete();
            if (arr.length === 6) {
                event.target.disabled = true;
            }
            this.products = this.products.concat(arr);
            // this.hasmore = false;
        }, 500);
    }

    // 获取左侧菜单
    getCategories() {
        this.categories = [
            {
                FavoritesId: 0,
                FavoritesTitle: '特惠专区',
            },
            {
                FavoritesId: 1,
                FavoritesTitle: '休闲零食'
            },
            {
                FavoritesId: 2,
                FavoritesTitle: '方便速食'
            },
            {
                FavoritesId: 3,
                FavoritesTitle: '水果甜点'
            },
            {
                FavoritesId: 4,
                FavoritesTitle: '饮料饮品'
            },
        ];
        // 默认获取第一个分类的商品列表
        this.params.favoritesId = this.categories[0].FavoritesId;
        this.getProducts();
        // this.appService.httpGet(AppGlobal.API.getCategories, { appTag: 'dress' }, rs => {
        //     console.debug(rs);
        //     this.categories = rs.data;
        //     //默认获取第一个分类的商品列表
        //     this.params.favoritesId = this.categories[0].FavoritesId;
        //     this.getProducts();
        // });
    }

    // 选中左侧菜单
    itemClick(c, event) {
        const initSelected: any = document.getElementsByClassName('menuItem');
        if (initSelected[0].classList.contains('active')) {
            initSelected[0].classList.remove('active');
        }

        // 移除上次选中菜单的样式
        if (this.selectedMenuTarget) {
            this.selectedMenuTarget.classList.remove('active');
        }

        // 修改本次选中菜单的样式
        event.currentTarget.classList.add('active');

        // 将本次选中的菜单记录
        this.selectedMenuTarget = event.currentTarget;

        this.hasmore = true;

        this.params.favoritesId = c.FavoritesId;
        this.params.pageNo = 1;

        this.getProducts();
    }

    getProducts() {
        this.products = Array.from({ length: 6 }, (_, k) => createShopData(k + 1));
        this.params.pageNo += 1;
        // this.appService.httpGet(AppGlobal.API.getProducts, this.params, rs => {
        //   this.products = rs.data;
        //   this.params.pageNo += 1;
        // })
    }

    doInfinite() {
        if (this.islock) {
            return;
        }
        if (this.hasmore === false) {
            return;
        }
        this.islock = true;
        // this.appService.httpGet(AppGlobal.API.getProducts, this.params, d => {
        //   this.islock = false;
        //   if (d.data.length > 0) {
        //     this.products = this.products.concat(d.data);
        //     this.params.pageNo += 1;
        //   } else {
        //     this.hasmore = false;
        //     console.log('没有数据啦！')
        //   }
        // });
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
