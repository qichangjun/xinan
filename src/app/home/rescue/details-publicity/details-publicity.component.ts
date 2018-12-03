import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'details-publicity',
    templateUrl: './details-publicity.component.html',
    styleUrls: ['./details-publicity.component.scss']
})
export class DetailsPublicityComponent implements OnInit {

    cons = [
        { imgUrl: '../../../../assets/icon/weixin.png', title: '微信' },
        { imgUrl: '../../../../assets/icon/friend.png', title: '朋友圈' },
        { imgUrl: '../../../../assets/icon/save.png', title: '保存' },

    ];
    type = true;  // true: donation  false: rescue
    id; // 无：心安跳转  有：申请跳转
    isShare = false;
    constructor(
        private router: ActivatedRoute,
        public alertController: AlertController,
    ) { }

    ngOnInit() {
        this.type = this.router.snapshot.queryParams['type'] === 'donation' ? false : true;
        this.id = this.router.snapshot.queryParams['id'];
    }
    alertMes() {
        this.presentAlert('感谢您的支持，您尚未获得此功能的使用权限，请耐心等待平台开放');
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
    }
    share() {
        this.isShare = !this.isShare;
    }
}
