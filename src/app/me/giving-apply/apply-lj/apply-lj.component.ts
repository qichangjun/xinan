import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DonationedData } from '../../../common/interface';

@Component({
    selector: 'app-apply-lj',
    templateUrl: './apply-lj.component.html',
    styleUrls: ['./apply-lj.component.scss']
})
export class ApplyLjComponent implements OnInit {

    type: String = 'sqlj';
    lists = [
        { imgUrl: '../../../assets/imgs/tx.png', title: '刘会亮', time: '身份证号：3505 **** **** 6577' },
        { imgUrl: '../../../assets/imgs/tx.png', title: '小仙女', time: '身份证号：3505 **** **** 6577' },
    ];
    listssq;

    constructor(
        private router: Router,
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
        this.router.navigate(['/rescue_apply/add_friends/lj']);
    }

}
function createNewData(id: number): DonationedData {

    const obj = {
        id: id.toString(),
        title: '大病无情，人间有爱',
        name: '刘慧光',
        imgUrl: '../../../assets/imgs/shang_img2@2x.png',
        state: 1,
        urlObj: {
            id: '1',
            type: 'rescue'
        },
        list: [
            {
                icon: 'md-contacts',
                name: '参与人数',
                value: '671',
            },
            {
                icon: 'md-cash',
                name: '机构领捐',
                value: '100,000',
            },
            {
                icon: 'md-calendar',
                name: '公示日期',
                value: '2018.10.21',
            },
        ],
        content: '我叫林惠光今年28岁，我弟弟叫林惠良今年25岁，家住安徽省阜阳市太和县马集乡臧庄村委刘小庄54号，自2011年鼻子长期流血经检查血小班减少...',
        jjxx: [
            {
                color: 'blue',
                title: '深圳基金会',
            },
            {
                color: 'yellow',
                title: '心安乐捐(意外)',
            }
        ],
    };

    if (obj.id === '2') {
        obj['jjxx'] = [
            {
                color: 'yellow',
                title: '心安乐捐(意外)',
            }
        ];
        obj['state'] = 0;
    }

    return obj;
}
