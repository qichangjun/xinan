import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class apiUrlService{
    baseUrl = 'http://120.78.200.228/';
    signIn = 'api/public/register';
    getCode = 'api/public/sendsms';
    resetPass = 'api/public/resetpassword';
    joinAnXin = 'api/user/vipcharge';
    aliPayOrder= 'api/order/pay'
    signInWithPassword = 'api/public/login';
    checkUserInfo = 'api/user/index';
    finishOrder = 'api/order/finish'
}