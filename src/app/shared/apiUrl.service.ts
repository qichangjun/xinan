import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class apiUrlService{
    baseUrl = 'http://120.79.0.57:3000/';
    signIn = 'login';
    getCode = 'verifycode';
    resetPass = 'uptPswd';
}