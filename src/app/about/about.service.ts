import { Injectable } from '@angular/core';

import { httpHanldeService } from '../shared/httpHandle.service'
import { apiUrlService } from '../shared/apiUrl.service'
import { Http, URLSearchParams,Headers } from '@angular/http';
declare var sha256_digest: any;
@Injectable({
    providedIn: 'root'
})
export class AboutService {
    constructor(
        private http: Http,
        private _httpHanldeService: httpHanldeService,
        private _apiUrlService: apiUrlService
    ) {

    }

    async getShopMenu() {
        let parameter = new URLSearchParams()
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.getShopMenu, { search: parameter })
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

    getShopDetail(id) {
        let parameter = new URLSearchParams()
        parameter.set('id',id)
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.getShopDetail, { search: parameter })
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

    addToShopcar(id){
        let parameter = new URLSearchParams()
        parameter.set('id',id)
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.addToShopcar, 
            { 
            headers: myHeaders,
            search: parameter })
            .toPromise()
            .then(res => {
                let body = res.json();
                if (body.data && body.data.status == 1) {
                    return body.data;
                } else {
                    return Promise.reject(body.msg);
                }
            })
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    getShoCardData(){
        let parameter = new URLSearchParams()
     
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.getShoCardData, 
            { 
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

    getAllOrder(status,page){
        let parameter = new URLSearchParams()
        parameter.set('status',status)
        parameter.set('page',page)
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.getAllOrder, 
            { 
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