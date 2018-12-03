import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bind-wechat',
    templateUrl: './bind-wechat.component.html',
    styleUrls: ['./bind-wechat.component.scss']
})
export class BindWechatComponent implements OnInit {
    time = 3;
    timer = null;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        this.timer = setInterval(() => {
            this.time--;
            if (this.time === 0) {
                clearInterval(this.timer);
                this.timer = null;
                // 退出登录
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                this.router.navigate(['/']);
            }
        }, 1000);
    }

}
