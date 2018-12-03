import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    userInfo: any;
    telephone = '4009612590';

    constructor(
        private router: Router,
        private activedRoute: ActivatedRoute,
        private alertController: AlertController,
        private callNumber: CallNumber
    ) {
        console.log(this.activedRoute.queryParams['value']);
        this.userInfo = this.activedRoute.queryParams['value'];
    }

    ngOnInit() {
    }

    async alertMessage(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }

    service() {
        this.callNumber.callNumber(this.telephone, true).catch((err) => {
            alert('Error launching dialer ' + err);
        });
    }
    JumpTo(url: string) {
        if (url === '/auth/modify-pass') { // 修改登录密码
            this.router.navigate([url], { queryParams: this.userInfo });
        } else {
            this.router.navigate([url]);
        }

    }

    logout() {
        const buttons = [
            {
                text: '取消',
                role: 'cancel',
                cssClass: 'secondary'
            }, {
                text: '确定',
                handler: () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');
                    this.router.navigate(['/']);
                }
            }
        ];
        this.alertMessage('', '确定要退出此账号吗？', buttons);
    }

}
