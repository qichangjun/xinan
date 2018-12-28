import { Injectable } from '@angular/core';
import { httpHanldeService } from '../../../shared/httpHandle.service'
import { apiUrlService } from '../../../shared/apiUrl.service'
import { Http, URLSearchParams,Headers } from '@angular/http';
declare var sha256_digest: any;
@Injectable({
    providedIn: 'root'
})
export class JoinNowService {
    constructor(
        private http: Http,
        private _httpHanldeService: httpHanldeService,
        private _apiUrlService: apiUrlService
    ) {

    }

    checkUserInfo() {
        let parameter = new URLSearchParams()
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.checkUserInfo, { 
            headers: myHeaders,
            search: parameter })
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

    finishOrder(id) {
        let parameter = new URLSearchParams()
        parameter.set('id',id)
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.finishOrder, { 
            headers: myHeaders,
            search: parameter })
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

    async join(certification_username: string,certification_number:string) {
        let parameter = new URLSearchParams()
        let post_data = {
            cart : [{"id":458,"name":"年费","num":1}],
            remark : '加入安心',
            payment_id : 3,
            certification:{
                certification_username : certification_username,
                certification_number : certification_number
            }
        }
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.post(this._apiUrlService.baseUrl + this._apiUrlService.joinAnXin,post_data, { 
            headers: myHeaders,
            search: parameter })
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

    async aliPayOrder(orderId: string) {
        let parameter = new URLSearchParams()
        parameter.set('id',orderId)
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.aliPayOrder, { 
            headers: myHeaders,
            search: parameter })
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
}