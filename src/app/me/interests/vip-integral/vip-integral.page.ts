import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-vip-integral',
    templateUrl: './vip-integral.page.html',
    styleUrls: ['./vip-integral.page.scss'],
})
export class VipIntegralPage implements OnInit {
    // isOpen = false;
    itemNeg = false;
    str;
    mouth;
    mouths = [
        { mouth: '本月', isOpen: false },
        { mouth: '2018年9月', isOpen: false },
        { mouth: '2018年8月', isOpen: false },
    ];
    lists = [
        { imgUrl: '../../../assets/imgs/avatar.png', title: '购买家用戴恩吸尘器', time: '今天　04:37', val: '+36积分' },
        { imgUrl: '../../../assets/imgs/avatar.png', title: '购买日用品', time: '昨天 04:37', val: '+36' },
        { imgUrl: '../../../assets/imgs/avatar.png', title: '其他消费', time: '08-11 04:37', val: '-2036', itemNeg: 'true' },

    ];
    constructor() {
        // this.lists.forEach((data: any) => {
        //     this.str = data.val.substr(0, 1);
        //     console.log(this.str);
        // if (this.str === '-') {
        //     this.itemNeg = true;
        // }
        // });
    }
    ngOnInit() {
        // if (this.str === '-') {
        //     this.itemNeg = true;
        // }
    }
    openDiv(index) {
        if (this.mouths[index]) {
            this.mouths[index].isOpen = !this.mouths[index].isOpen;
        }
        // console.log(this.mouths[index]);
    }

}
