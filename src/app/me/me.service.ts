import { Injectable } from '@angular/core';

import { httpHanldeService } from '../shared/httpHandle.service'
import { apiUrlService } from '../shared/apiUrl.service'
import { Http, URLSearchParams,Headers } from '@angular/http';
declare var sha256_digest: any;
@Injectable({
    providedIn: 'root'
})
export class MeService {
    constructor(
        private http: Http,
        private _httpHanldeService: httpHanldeService,
        private _apiUrlService: apiUrlService
    ) {

    }

    getAddressList() {
        let parameter = new URLSearchParams()
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.getAddressList, 
            { 
            headers: myHeaders,
            search: parameter })
            .toPromise()
            .then(res => {
                let body = res.json();
                if(body.status == 401){
                    return Promise.reject(body);
                }
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

    addAddress(info,id) {
        let parameter = new URLSearchParams()
        const myHeaders: Headers = new Headers();
        let post_data = {
            province:info.province,
            city:info.city,
            district:info.district,
            name : info.name,
            phone : info.phone,
            address:info.address,
            id : id
        }
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.post(this._apiUrlService.baseUrl + this._apiUrlService.addAddress,
            post_data, 
            { 
            headers: myHeaders,
            search: parameter })
            .toPromise()
            .then(res => {
                let body = res.json();
                if(body.status == 401){
                    return Promise.reject(body);
                }
                if (body.code == 1) {
                    return body.data;
                } else {
                    return Promise.reject(body.msg);
                }
            })
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    setAsDefault(contact_id){
        let parameter = new URLSearchParams()
        parameter.set('contact_id',contact_id)
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.setAsDefault, 
            { 
            headers: myHeaders,
            search: parameter })
            .toPromise()
            .then(res => {
                let body = res.json();
                if(body.status == 401){
                    return Promise.reject(body);
                }
                if (body.code == 1) {
                    return body.data;
                } else {
                    return Promise.reject(body.msg);
                }
            })
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    deleteAddress(contact_id){
        let parameter = new URLSearchParams()
        parameter.set('id',contact_id)
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.deleteAddress, 
            { 
            headers: myHeaders,
            search: parameter })
            .toPromise()
            .then(res => {
                let body = res.json();
                if(body.status == 401){
                    return Promise.reject(body);
                }
                if (body.code == 1) {
                    return body.data;
                } else {
                    return Promise.reject(body.msg);
                }
            })
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    updateUserInfo(userInfo){
        let parameter = new URLSearchParams()
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.post(this._apiUrlService.baseUrl + this._apiUrlService.updateUserInfo, 
            userInfo,
            { 
            headers: myHeaders,
            search: parameter })
            .toPromise()
            .then(res => {
                let body = res.json();
                if(body.status == 401){
                    return Promise.reject(body);
                }
                if (body.code == 1) {
                    return body.data;
                } else {
                    return Promise.reject(body.msg);
                }
            })
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    checkUserInfo(){
        let parameter = new URLSearchParams()
        const myHeaders: Headers = new Headers();
        myHeaders.set('Authorization', "Bearer "+window.localStorage.getItem('token'))
        return this.http.get(this._apiUrlService.baseUrl + this._apiUrlService.checkUserInfo, 
            { 
            headers: myHeaders,
            search: parameter })
            .toPromise()
            .then(res => {
                let body = res.json();
                if(body.status == 401){
                    return Promise.reject(body);
                }
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