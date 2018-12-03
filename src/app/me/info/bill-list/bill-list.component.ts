import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-bill-list',
    templateUrl: './bill-list.component.html',
    styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

    tag = 0; // 默认展示全部

    constructor(
        private router: Router,
        private activedRoute: ActivatedRoute
    ) {
        this.activedRoute.params.subscribe(
            (params) => {
                this.tag = params.type;
            }
        );
    }

    ngOnInit() {
    }

    segmentChanged(ev) {
        // 0:全部 1:救助 2:缴年费 3:乐捐 4:积分
        this.tag = ev.detail.value;
    }

    // 查看账单详情
    goDetail() {
        this.router.navigate(['/info/bill-detail/one/1']);
    }

}
