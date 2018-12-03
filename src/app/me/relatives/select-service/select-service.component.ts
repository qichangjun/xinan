import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-select-service',
    templateUrl: './select-service.component.html',
    styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit {
    params = {
        type: 'add', // charge:亲友充值  add:添加亲友
        relatives: []
    };

    constructor(
        private router: Router,
        private activedRoute: ActivatedRoute
    ) {
        const params = this.activedRoute.queryParams['value'];
        this.params = {
            type: params.type,
            relatives: JSON.parse(params.relatives)
        };
        console.log(this.params);

    }

    ngOnInit() {
    }

    // 选择服务
    selectService(service_type) {
        // type: 1 基金 2 年费
        if (this.params.type === 'add') { // 添加亲友
            this.router.navigate(['/relatives/fill-information', service_type]);
        } else { // 亲友充值
            this.router.navigate(['/relatives/pay'],
                { queryParams: { type: this.params.type, service_type: service_type, relatives: JSON.stringify(this.params.relatives) } });
        }
    }

}
