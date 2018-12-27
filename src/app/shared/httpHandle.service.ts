import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ToastController } from '@ionic/angular';
import { HTTPResponse } from '@ionic-native/http';
import { Router, ActivatedRoute, DefaultUrlSerializer } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class httpHanldeService {
    constructor(
        private router: Router,
        public toastCtrl: ToastController){}

    public extractDataSuccess(res) {
        let body = res.json();       
        if (body.data) {
            return body.data;
        } else { 
            return Promise.reject(body);
        }
    }

    public extractData(res) {
        let body = res.json();
        if (body.data) {
            return body.data;
        } else { 
            return Promise.reject(body);
        }
    }

    public extractDataNativeHttp(res: HTTPResponse){
        
    }

    public handleError(error: any): Promise<any> {  
        // this.router.navigate(['/auth/sign-in']);
        // this.showToast('请先登陆')
        if (error.statusText == "Unauthorized" || error.statusText == 'Invalid token'){
            this.showToast('请先登陆')
        }
        return Promise.reject(error.msg || error.statusText || error);
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
}