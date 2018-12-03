import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
    selector: 'app-interests',
    templateUrl: './interests.component.html',
    styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

    img: String = '../assets/imgs/avatar.png';
    cardMem: Array<object> = [
        {
            title: '心安会员',
            topup: 1,
            czmx: 2,
            detailTopupUrl: '',
            goTopupUrl: '/interests/member',
            items: [
                {
                    name: '会员有效期',
                    value: '免费'
                },
                {
                    name: '团体类别',
                    value: '拥军优属'
                },
                {
                    name: '年费余额',
                    value: '0元'
                },
                {
                    name: '会员状态',
                    value: '正常'
                },
            ]
        },
        {
            title: '心安救助',
            topup: 1,
            czmx: 1,
            detailTopupUrl: '',
            goTopupUrl: '/interests/rescue',
            items: [
                {
                    name: '救助余额',
                    value: '33.58元'
                },
                {
                    name: '救助状态',
                    value: '正常'
                },
                {
                    name: '大病救助基金',
                    value: '观察期（剩余89天）'
                }
            ]
        },
        {
            title: '心安乐捐',
            topup: 0,
            items: [
                {
                    name: '乐捐状态',
                    value: '正常'
                },
                {
                    name: '有效期至',
                    value: '2018.10.02'
                }
            ]
        },
        {
            title: '会员福利',
            topup: 0,
            items: [
                {
                    name: '公益电影',
                    value: '暂无',
                    url: '',
                }
            ]
        },
    ];

    constructor(
        public alertController: AlertController,
    ) {
    }

    ngOnInit() {
    }

}
