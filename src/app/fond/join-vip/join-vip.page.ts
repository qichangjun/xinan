import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router/';
@Component({
    selector: 'app-join-vip',
    templateUrl: './join-vip.page.html',
    styleUrls: ['./join-vip.page.scss'],
})
export class JoinVipPage implements OnInit {

    constructor(
        private alertController: AlertController,
        private router: Router,
    ) { }

    ngOnInit() {
    }
    upLoad() {
        this.router.navigate(['/info/auth-upload']);
    }
    async presentAlert(header, message) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: ['好的'],
            cssClass: 'alertCustomCss'
        });

        await alert.present();
    }
    // 救助金说明
    rescueConvention() {
        this.presentAlert(
            '《心安救平台会员公约》',
            `第一章 前言 <br/>
      2015年的政府工作报告中，李克强总理提到了“加强重特大疾病医疗救助，全面实施临时救助制度，让遇到急难特困的群众求助有门、受助及时。”可见医疗救助在保障公民的生存权、健康公平权领域起着不可替代的作用。<br/>
      团结一切可以团结的力量，帮助一帮有需要的人，为国内广大人民群众大病医疗提供保障，提升医疗机构服务水平，促进全面创新慈善事业的发展，提升国民安全感，是现阶段的历史使命。<br/>
      本项目就是根据该社会背景设立的，我们希望可以缓解当前医疗救助事业存在的诸多问题，使病患获得医疗上的经济援助，获得救治机会，重拾生活信心。<br/>
      第二章 释义
      “心安大病救助行动”是珠海市横琴心安投资控股有限公司与符合本项目要求的会员共同发起的重大疾病救助项目（以下简称“本项目”）。
      《心安大病救助行动公约》（以下简称“本公约”）为需参与本项目的全体会员（以下简称“您”）共同遵守的规则。<br/>
      您在确认加入本项目前请仔细阅读本公约，在您确认参与后即默认您已充分理解本公约的全部内容，并同意认真遵守本公约的权利义务。<br/>
      会员：是平台会员与行动会员的统称。<br/>
      平台会员：是指具有完全民事权利能力和民事行为能力，在心安完成注册流程的个人和团体。<br/>
      行动会员：是指符合本项目参与条件并确认参与本项目的平台会员。`
        );
    }
    class() {
        this.presentAlert(
            '提示',
            `此功能正在拼命开发中，请等待。`
        );
    }
}
