import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-relatives',
    templateUrl: './relatives.component.html',
    styleUrls: ['./relatives.component.scss']
})
export class RelativesComponent implements OnInit {

    view_or_config = true; // true: 查看 false: 管理

    relativeList = [
        {
            id: 1,
            avatar: '../../../assets/imgs/avatar.png',
            name: '李雷',
            identityNumber: '3505 **** **** 6577',
            deadline: '2018.09.16',
            overage: 33.58,
            isChecked: false
        },
        {
            id: 2,
            avatar: '../../../assets/imgs/avatar.png',
            name: '韩梅梅',
            identityNumber: '3505 **** **** 6555',
            deadline: '2018.09.16',
            overage: 33.58,
            isChecked: false
        }
    ];
    choosedList = [];
    ischeckAll = false; // 全选

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    // 选中或取消一个
    checkOne(ev, data) {

        // 1. 若单个的全部选中 则 全选选中
        let all_check = true;
        for (let i = 0, len = this.relativeList.length; i < len; i++) {
            all_check = all_check && this.relativeList[i].isChecked;
        }

        if (all_check) {
            this.ischeckAll = true;
            const event = { detail: { checked: true } };
            // this.checkAll(true, 1);
        } else {
            this.ischeckAll = false;
            const event = { detail: { checked: false } };
            // this.checkAll(false, 1);
        }

        // 2. 数据更新
        const index = this.choosedList.indexOf(data);
        // console.log(index);
        if (ev.detail.checked && index <= -1) {
            this.choosedList.push(data);
        } else if (!ev.detail.checked && index > -1) {
            this.choosedList.splice(index, 1);
        }
    }

    // 全选或全不选
    checkAllOrNot() {
        console.log(this.ischeckAll);
        if (!this.ischeckAll) {
            this.ischeckAll = false;
            for (let i = 0, len = this.relativeList.length; i < len; i++) {
                this.relativeList[i].isChecked = true; // ev.detail.checked
            }
            this.choosedList = this.relativeList;
        } else {
            this.ischeckAll = true;
            for (let i = 0, len = this.relativeList.length; i < len; i++) {
                this.relativeList[i].isChecked = false; // ev.detail.checked
            }
            this.choosedList = [];
        }

    }

    // 去充值
    sureToCharge() {
        console.log(this.choosedList);
        if (this.choosedList) {
            this.router.navigate(['/relatives/select-service'],
                { queryParams: { type: 'charge', relatives: JSON.stringify(this.choosedList) } });
        }
    }

    // 添加亲友
    addRelative() {
        this.router.navigate(['/relatives/select-service'], { queryParams: { type: 'add', relatives: '[]' } });
    }

}
