import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'pay-goods',
    templateUrl: './pay-goods.component.html',
    styleUrls: ['./pay-goods.component.scss']
})
export class PayGoodsComponent implements OnInit {

    @Input() data: object;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    details(id) {
        this.router.navigate(['/details/' + id]);
    }

}
