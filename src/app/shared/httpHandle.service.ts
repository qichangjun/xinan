import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ToastController } from '@ionic/angular';
import { HTTPResponse } from '@ionic-native/http';
@Injectable({
    providedIn: 'root'
})
export class httpHanldeService {
    constructor(public toastCtrl: ToastController){}

    public extractDataSuccess(res) {
        let body = res.json();    
        this.showToast(body.message)   
        if (body.code == 200) {
            return body.data || {};
        } else { 
            return Promise.reject(body.message);
        }
    }

    public extractData(res) {
        let body = res.json();
        if (body.code == 200) {
            return body.data || {};
        } else { 
            return Promise.reject(body.message);
        }
    }

    public extractDataNativeHttp(res: HTTPResponse){
        
    }

    public handleError(error: any): Promise<any> {  
        console.error(error)   
        return Promise.reject(error.message || error);
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