import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class apiUrlService{
    baseUrl = 'http://120.78.200.228/';
    signIn = 'api/public/register';
    getCode = 'api/public/sendsms';
    resetPass = 'api/public/resetpassword';
    signInWithPassword = 'api/public/login';
}