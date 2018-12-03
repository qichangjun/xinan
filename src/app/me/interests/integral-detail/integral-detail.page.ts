import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-integral-detail',
    templateUrl: './integral-detail.page.html',
    styleUrls: ['./integral-detail.page.scss'],
})
export class IntegralDetailPage implements OnInit {

    items = [
        { title: '账单状态', lab: '交易成功' },
        { title: '支付方式', lab: '微信支付' },
        { title: '创建时间', lab: '2017-01-30 16:20:34' },
        { title: '订单编号', lab: '3265974646' }
    ];
    integrals = [
        { imgUrl: '../../../assets/imgs/avatar.png', name: '戴森吸尘器家用', price: '+55.00' }
    ];

    constructor() { }
    ngOnInit() {
    }

}
