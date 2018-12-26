import { Injectable } from '@angular/core';

import { httpHanldeService } from '../../shared/httpHandle.service'
import { apiUrlService } from '../../shared/apiUrl.service'
import { Http, URLSearchParams } from '@angular/http';
declare var sha256_digest: any;
@Injectable({
    providedIn: 'root'
})
export class SignService {
    constructor(
        private http: Http,
        private _httpHanldeService: httpHanldeService,
        private _apiUrlService: apiUrlService
    ) {

    }

    async getCode(phone: string) {
        let parameter = new URLSearchParams()
        parameter.set('phone', phone)
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.getCode, { search: parameter })
            .toPromise()
            .then(res => {
                let body = res.json();
                if (body.data) {
                    return body.data;
                } else {
                    return Promise.reject(body.msg);
                }
            })
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    signIn(mobile: string, verifyCode: string, reqId: string, password) {
        let post_data = {
            phone: mobile,
            code: verifyCode.toString(),
            password: password,
            uuid: reqId
        }
        return this.http.post(this._apiUrlService.baseUrl + this._apiUrlService.signIn, post_data, {})
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractDataSuccess(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    signInWithPassword(mobile: string, password: string) {
        let post_data = {
            phone: mobile,
            password: password,
            remember : true 
        }
        return this.http.post(this._apiUrlService.baseUrl + this._apiUrlService.signInWithPassword, post_data, {})
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractDataSuccess(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    resetPass(mobile: string, password: string, verifyCode: string, reqId: string) {
        let post_data = {
            phone: mobile,
            code: verifyCode.toString(),
            password: password,
            uuid: reqId
        }
        return this.http.post(this._apiUrlService.baseUrl + this._apiUrlService.resetPass, post_data, {})
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractDataSuccess(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }
}