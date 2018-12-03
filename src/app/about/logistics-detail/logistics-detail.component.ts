import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-logistics-detail',
    templateUrl: './logistics-detail.component.html',
    styleUrls: ['./logistics-detail.component.scss']
})
export class LogisticsDetailComponent implements OnInit {
    lists = [
        { img: '../../../assets/imgs/bag1.png', title: '女士个性标语肩带单肩包时尚便携真皮手提包', price: '3319.00', num: '1', id: 1 },
    ];
    constructor() { }

    ngOnInit() {
    }
}
