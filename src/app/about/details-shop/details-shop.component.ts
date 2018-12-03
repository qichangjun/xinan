import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
    selector: 'app-details-shop',
    templateUrl: './details-shop.component.html',
    styleUrls: ['./details-shop.component.scss']
})
export class DetailsShopComponent implements OnInit {

    @ViewChild('slides') slides: Slides;
    imgs = [
        '../../assets/imgs/img_shop_big.png',
        '../../assets/imgs/img_01@3x.png',
        '../../assets/imgs/img_jifen@2x.png'
    ];
    years: any = 1;
    remHigh: Number = 0;
    addHigh: Number = 1;

    constructor(
        private router: Router,
        public alertController: AlertController,
        private navCtrl: NavController,


    ) { }

    ngOnInit() {
    }

    ionSlideTouchStart() {
        this.slides.slideTo(1, 500);
        this.startSlideAutoplay();
    }

    async startSlideAutoplay() {
        await this.slides.startAutoplay();
    }

    remove() {
        if (this.years > 1) {
            this.remHigh = 1;
            this.addHigh = 1;
            // tslint:disable-next-line:radix
            this.years = parseInt(this.years) - 1;
        } else {
            this.remHigh = 0;
        }
    }

    add() {
        if (this.years !== 12) {
            this.addHigh = 1;
            this.remHigh = 1;
            // tslint:disable-next-line:radix
            this.years = parseInt(this.years) + 1;
        } else {
            this.addHigh = 0;
        }
    }

    // buyNow() {
    //     this.router.navigate(['/confirm_order']);
    // }

    shoppingCart() {
        this.router.navigate(['/card']);
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
    buyNow() {
        const header = '提示！';
        const message = '商城尚未开放购买权限，请耐心等待。';
        const buttons = [
            {
                text: '取消',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                }
            }, {
                text: '返回商城',
                // role: '',
                handler: () => {
                    this.router.navigate(['tabs']);
                    // this.navCtrl.navigateForward('tabs');
                }
            }
        ];
        this.alertMessage(header, message, buttons);
    }
    // this.presentAlert(
    //     '提示',
    //     `商城尚未开放购买权限，请耐心等待`
    // );
    async alertMessage(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }
}

