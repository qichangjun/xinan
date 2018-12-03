import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  cons = [
    { imgUrl: '../../../../assets/icon/weixin.png', title: '微信' },
    { imgUrl: '../../../../assets/icon/friend.png', title: '朋友圈' },
    { imgUrl: '../../../../assets/icon/qq.png', title: 'QQ' },
    { imgUrl: '../../../../assets/icon/qqspace.png', title: 'QQ空间' },
    { imgUrl: '../../../../assets/icon/weibo.png', title: '微博' },
    { imgUrl: '../../../../assets/icon/save.png', title: '保存' },
  ];
  constructor(
    public alertController: AlertController,

  ) { }

  ngOnInit() {
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
}
