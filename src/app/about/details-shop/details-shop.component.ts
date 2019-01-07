import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides, AlertController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { AboutService } from '../about.service'
import { apiUrlService} from '../../shared/apiUrl.service'
import { DomSanitizer } from '@angular/platform-browser';
import { MeService } from '../../me/me.service'
@Component({
    selector: 'app-details-shop',
    templateUrl: './details-shop.component.html',
    styleUrls: ['./details-shop.component.scss']
})
export class DetailsShopComponent implements OnInit {
    id : string = ''
    buttons = [
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
    ]
    product_skuItem : any = undefined
    detailInfo : any = undefined
    @ViewChild('slides') slides: Slides;
    imgs = [
        '../../assets/imgs/img_shop_big.png',
        '../../assets/imgs/img_01@3x.png',
        '../../assets/imgs/img_jifen@2x.png'
    ];
    years: any = 1;
    remHigh: Number = 0;
    addHigh: Number = 1;
    cartNumb : Number = 0;
    constructor(
        private _MeService : MeService,
        private router: Router,
        public alertController: AlertController,
        public activeRoute: ActivatedRoute,
        public _aboutService : AboutService,
        public _apiUrlService : apiUrlService,
        private sanitizer: DomSanitizer
    ) {
        this.activeRoute.params.subscribe(
            (params) => {
               this.id = params.id  
               this.getShopDetail()
               this.getShopCartList()
            });
     }

    ngOnInit() {
    }

    async getShopCartList(){
        let res = await this._aboutService.getShoCardData()
        this.cartNumb = res.cartNumb
    }

    async getShopDetail(){
        let res = await this._aboutService.getShopDetail(this.id)
        
        this.detailInfo = res 
        if (this.detailInfo){
            var reg = new RegExp( '/public/uploads/' , "g" )
            this.detailInfo.detail =  this.detailInfo.detail.replace( reg , this._apiUrlService.baseUrl + '/public/uploads/' );
            this.detailInfo.detail = this.sanitizer.bypassSecurityTrustHtml((this.detailInfo.detail));
            this.product_skuItem = this.detailInfo.product_sku[0]
        }

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

    buyNow() {
        this.router.navigate(['/confirm_order'], { queryParams: { id:this.id,count:this.years } });
    }

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
   
    
    async alertMessage(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }

    async addToShopcar(){
        try{
            let res = await this._aboutService.addToShopcar(this.id,this.years)
            this.presentAlert(res.info,res.msg)
            this.getShopCartList()
        }catch(err){
            this.alertMessage('提示', '出错了', this.buttons);
        }
        
    }
}

