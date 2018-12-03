import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DonationedData } from '../../../common/interface';
import { AlertController } from '@ionic/angular';
@Component({
    selector: 'app-apply-now',
    templateUrl: './apply-now.component.html',
    styleUrls: ['./apply-now.component.scss']
})
export class ApplyNowComponent implements OnInit {

    type: String = 'sqjz';
    lists = [
        { imgUrl: '../../../assets/imgs/tx.png', title: '刘会亮', time: '身份证号：3505 **** **** 6577', isShow: true },
        { imgUrl: '../../../assets/imgs/tx.png', title: '小仙女', time: '身份证号：3505 **** **** 6577', isShow: true },
    ];
    listssq: Array<any>;
    isshow = false;

    constructor(
        private router: Router,
        public alertController: AlertController,
    ) { }

    ngOnInit() {
        this.listssq = Array.from({ length: 2 }, (_, k) => createNewData(k + 1));
    }

    segmentChanged(ev: any) {
        this.type = ev.detail.value;
    }

    // 添加亲友
    addFriends() {
        this.router.navigate(['/relatives/select-service'], { queryParams: { type: 'add', relatives: '[]' } });
    }

    applicationCreate() {
        this.router.navigate(['/rescue_apply/add_friends/jz']);
    }

    close() {
        this.isshow = !this.isshow;
    }
}

function createNewData(id: number): DonationedData {

    const obj = {
        id: id.toString(),
        title: '心安大病救助专项基金',
        name: '林惠良',
        date: '2018-02-30',
        money: '6.80',
        imgUrl: '../../../assets/imgs/shang_img2@2x.png',
        num: 167,
        state: 1,
        urlObj: {
            id: '1',
            type: 'donation'
        },
        list: [
            {
                icon: 'md-cash',
                name: '救助金额',
                value: '100,000',
            },
            {
                icon: 'md-calendar',
                name: '公示日期',
                value: '2018.10.21',
            },
        ],
        content: '我叫林惠光今年28岁，我弟弟叫林惠良今年25岁，家住安徽省阜阳市太和县马集乡臧庄村委刘小庄54号，自2011年鼻子长期流血经检查血小班减少...',
    };
    if (obj.id === '2') {
        obj['state'] = 0;
    }

    return obj;
}
