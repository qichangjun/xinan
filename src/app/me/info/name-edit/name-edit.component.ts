import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MeService } from '../../me.service'
import { updateCurrentUserInfo } from '../../../shared/graphql-tag';

@Component({
    selector: 'app-name-edit',
    templateUrl: './name-edit.component.html',
    styleUrls: ['./name-edit.component.scss']
})
export class NameEditComponent implements OnInit {
    userInfo : any = {}
    constructor(
        public _MeService : MeService,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private apollo: Apollo,
        private router: Router,
        private activedRoute: ActivatedRoute
    ) {
        
    }

    ngOnInit() {
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    }

    async showToast(msg: string, pos: any = 'bottom') {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: pos,
            cssClass: 'auth-toast',
            translucent: true
        });
        toast.present();
    }

    async showErrorToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'middle',
            cssClass: 'auth-error-toast',
            translucent: true
        });
        toast.present();
    }

    async update(){
        try{
            await this._MeService.updateUserInfo(this.userInfo)
            this.showToast('设置成功')
        
            localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        }catch(err){
            this.showErrorToast(err)
        }
        
    }

    back() {
        // 重置数据
        this.router.navigate(['/tabs']);
    }
}
