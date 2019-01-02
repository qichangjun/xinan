import { Component, OnInit } from '@angular/core';
import { ShopData } from '../../common/interface';
import { Router,ActivatedRoute } from '@angular/router';
import { apiUrlService } from '../../shared/apiUrl.service'
import { AboutService } from '../about.service'
@Component({
    selector: 'app-more-list',
    templateUrl: './more-list.component.html',
    styleUrls: ['./more-list.component.scss']
})
export class MoreListComponent implements OnInit {
    page : number = 1;
    totalCount : number = 0
    shopData = [];
    menu_id : any = undefined;
    menu_name : string = '';
    constructor(
        private _AboutService : AboutService,
        private _Router : Router,
        public _apiUrlService : apiUrlService,
        public activeRoute: ActivatedRoute,
    ) {
        this.activeRoute.params.subscribe(params=>{
            this.menu_id = params.id
            this.menu_name = params.name
        })
    }

    ngOnInit() {
        this.getShopListsByMenuId()
    }

    async getShopListsByMenuId(){
        let res = await this._AboutService.getShopListsByMenuId(this.menu_id)
        this.shopData = res.product
        this.page = res.pageinfo.page
        this.totalCount = res.pageinfo.rowCount
    }

    goDetails(id){
        this._Router.navigate(['/details/' + id])
    }

    loadData(event) {
        setTimeout(() => {
            event.target.complete();
            if (this.shopData.length >= this.totalCount) {
                event.target.disabled = true;
            }
            this.getShopListsByMenuId()
        }, 500);
    }
}


