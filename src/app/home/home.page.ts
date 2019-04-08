import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { RescueData, GivingData, PublicData } from '../common/interface';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    @ViewChild('slides') slides: Slides;
    isShow = false;
    isPublic = false;
    tag = '公告中';
    items;
    carLable = '救助人数';
    options: {
        autoplay: true,
        effect: 'flip',
    };
    imgs = [
        '../../assets/imgs/banner_shangcheng@2x.png',
        '../../assets/imgs/img_01@3x.png',
        '../../assets/imgs/img_jifen@2x.png'
    ];

    constructor(
        private router: Router,
        public alertController: AlertController,
    ) {
        this.items = Array.from({ length: 2 }, (_, k) => createNewRescue(k + 1));
    }

    ngOnInit() {
    }

    donations() {
        if (this.tag === '公告中') {
            return '';
        } else {
            this.router.navigate(['/donation']);
        }
    }

    pool() {
        if (this.isShow === false) {
            this.router.navigate(['/help_money']);
        } else {
            this.router.navigate(['/donation_list']);
        }
    }

    add() {
        this.router.navigate(['/join_now']);
    }

    allType() {
        if (this.isShow === false) {
            this.router.navigate(['/all_rescue/1']);
        } else {
            this.router.navigate(['/all_rescue/2']);
        }
    }

    support() {
        this.isPublic = false;
        this.isShow = true;
        this.tag = '我要捐款';
        this.items = Array.from({ length: 2 }, (_, k) => createNewGiving(k + 1));
    }

    public() {
        this.isPublic = true;
        this.tag = '公告中';
        this.isShow = true;
        this.items = Array.from({ length: 2 }, (_, k) => createNewPublic(k + 1));
    }

    async stopSlideAutoplay() {
        await this.slides.stopAutoplay();
    }

    ionSlideTouchStart() {
        this.slides.slideTo(1, 500);
        this.startSlideAutoplay();
    }

    async startSlideAutoplay() {
        await this.slides.startAutoplay();
    }

    segmentChanged(ev: any) {
        if (ev.detail.value === 'giving') {
            this.carLable = '已帮扶';
            this.tag = '我要捐款';
            this.isShow = true;
            this.isPublic = false;
            this.items = Array.from({ length: 2 }, (_, k) => createNewGiving(k + 1));
        } else {
            this.carLable = '已救助';
            this.tag = '公告中';
            this.isShow = false;
            this.items = Array.from({ length: 2 }, (_, k) => createNewRescue(k + 1));
        }
    }
    alert() {
        this.presentAlert('感谢您的支持，您尚未获得此功能的使用权限，请耐心等待平台开放。');
    }

    async presentAlert(message) {
        const alert = await this.alertController.create({
            message,
            buttons: ['好的']
        });

        await alert.present();
    }

}
function createNewRescue(id: number): RescueData {

    return {
        id: id.toString(),
        title: '疾病无情，人间有爱',
        image: '../../assets/imgs/shang_img2@2x.png',
        name: '林惠良',
        price: '100,000',
        rescueDate: '2018-10-21',
        introduce: '我叫林惠光今年28岁，我弟弟叫林惠良今年25岁，家住安徽省阜阳市太和县马集乡臧庄村委刘小庄54号，自2011年鼻子长期流血经检查血小班减少，皮肤黏膜出血6年，到现在已花光30万有余...'
    };
}
function createNewGiving(id: number): GivingData {

    return {
        id: id.toString(),
        title: '林慧光',
        image: '../../assets/imgs/shang_img2@2x.png',
        number: 475,
        price: '5000',
        introduce: '我叫林惠光今年28岁，我弟弟叫林惠良今年25岁，家住安徽省阜阳市太和县马集乡臧庄村委刘小庄54号，自2011年鼻子长期流血经检查血小班减少，皮肤黏膜出血6年，到现在已花光30万有余...',
        data: [
            {
                id: 'yjje',
                name: '已捐金额',
                value: 26560
            },
            {
                id: 'jglj',
                name: '机构领捐',
                value: 26560
            },
            {
                id: 'sxzj',
                name: '所需资金',
                value: 26560
            },
            {
                id: 'cyrs',
                name: '参与人数',
                value: 26560
            }
        ]
    };
}
function createNewPublic(id: number): PublicData {

    return {
        id: id.toString(),
        title: '林慧光',
        image: '../../assets/imgs/shang_img2@2x.png',
        number: 475,
        price: '5000',
        rescueDate: '2018-10-21',
        introduce: '我叫林惠光今年28岁，我弟弟叫林惠良今年25岁，家住安徽省阜阳市太和县马集乡臧庄村委刘小庄54号，自2011年鼻子长期流血经检查血小班减少，皮肤黏膜出血6年，到现在已花光30万有余...',
    };
}
