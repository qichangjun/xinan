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
    finishOrder = 'api/order/finish';
    getShopMenu = 'api/menu/index'
    getShopDetail = 'api/product/detail'
    addToShopcar = 'api/cart/add';
    getShoCardData = 'api/cart/index'
    getAddressList = 'api/user/contactlist'
    addAddress = 'api/user/addcontact'
    setAsDefault = 'api/user/setcontact'
    deleteAddress = 'api/user/delcontact'
    getAllOrder = 'api/order/index'
    addOrder = 'api/order/add'
    Pay = 'api/order/pay'
    cancelOrder = 'api/order/cancel'
    cleanShopCart = 'api/cart/del'
    getShopListsByMenuId = 'api/product/index'
}