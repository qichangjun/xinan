import { Component, OnInit } from '@angular/core';

import { DonationedData } from '../../common/interface';
@Component({
    selector: 'app-rescued',
    templateUrl: './rescued.component.html',
    styleUrls: ['./rescued.component.scss']
})
export class RescuedComponent implements OnInit {

    donations = [
        { title: '加入天数(天)', label: '15' },
        { title: '救助金额(元)', label: '68.30' },
        { title: '救助次数', label: '3' },
    ];
    datas;

    constructor() { }

    ngOnInit() {
        this.datas = Array.from({ length: 3 }, (_, k) => createDatas(k + 1));
    }

}
function createDatas(id: number): object {

    const list = createNewData(1);

    return {
        id: id.toString(),
        date: '2018-02-30',
        money: '6.80',
        list
    };
}

function createNewData(id: number): DonationedData {

    return {
        id: id.toString(),
        title: '疾病无情，人间有爱',
        name: '林慧光',
        imgUrl: '../../../assets/imgs/shang_img2@2x.png',
        state: 2,
        urlObj: {
            type: 'rescue'
        },
        list: [
            {
                icon: 'md-person',
                name: '参与人数',
                value: '167人',
            },
            {
                icon: 'md-card',
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
}
