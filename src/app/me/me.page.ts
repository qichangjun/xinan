import { OnEnter } from './on-enter';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';

import { findCurrentUserInfo, bindWeChat } from '../shared/graphql-tag';
import { Subscription } from 'rxjs';
import { FileUploadService } from '../shared/file-upload.service';
import { CameraAndImagePickerServices } from '../shared/cameraAndImagePickers.service';

// 引入微信服务
declare var Wechat: any;
declare var wilddog: any;
@Component({
    selector: 'app-me',
    templateUrl: './me.page.html',
    styleUrls: ['./me.page.scss']
})
export class MePage implements OnInit, OnEnter, OnDestroy {

    userInfo = {
        userId: '', // 用户id
        certifying: false,
        mobile: '去绑定', // 手机号
        email: '去绑定', // 邮箱
        createTime: '0000-00-00', // 注册时间
        openId: null,  // 微信绑定

        nickname: { // 昵称
            id: null,
            relationId: 1,
            value: '我的昵称'
        },
        avatar: { // 头像
            id: null,
            relationId: 2,
            value: '../../assets/imgs/img_avatar_default.png'
        },
        backgroundImg: { // 背景图
            id: null,
            relationId: 3,
            value: '../../assets/imgs/donationed.png'
        },
        sex: { // 性别
            id: null,
            relationId: 4,
            value: null
        },
        profile: { // 个人简介
            id: null,
            relationId: 5,
            value: ''
        },
        qrcode: { // 二维码
            id: null,
            relationId: 6,
            value: null
        },
        heartSafteyAccount: {
            id: null,
            relationId: 7,
            value: '---'
        }, // 心安号
    };
    isLogged = false; // 是否登录
    loading;
    wechatAlert;

    private subscription: Subscription;

    constructor(
        private router: Router,
        private apollo: Apollo,
        public alertController: AlertController,
        public activeRoute: ActivatedRoute,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public actionSheetController: ActionSheetController,
        private fileUpload: FileUploadService,
        private cameraAndImagePicker: CameraAndImagePickerServices
    ) {
    }

    public async ngOnInit(): Promise<void> {
        console.log('init');
        this.onEnter();
        this.subscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && (event.url === '/tabs/(me:me)' || event.url === '/tabs')) {
                this.onEnter();
            }
        });

    }

    public async onEnter(): Promise<void> {
        const userInfo = window.localStorage.getItem('userInfo');
        if (userInfo) {
            this.isLogged = true;
            this.getUserInfo();
        } else {
            this.init();
        }

    }

    public ngOnDestroy(): void {
        // console.log('destory');
    }

    init() {
        this.isLogged = false;
        this.userInfo = {
            userId: '', // 用户id
            certifying: false,
            mobile: '去绑定', // 手机号
            email: '去绑定', // 邮箱
            createTime: '0000-00-00', // 注册时间
            openId: null,  // 微信绑定

            nickname: { // 昵称
                id: null,
                relationId: 1,
                value: '我的昵称'
            },
            avatar: { // 头像
                id: null,
                relationId: 2,
                value: '../../assets/imgs/img_avatar_default.png'
            },
            backgroundImg: { // 背景图
                id: null,
                relationId: 3,
                value: '../../assets/imgs/donationed.png'
            },
            sex: { // 性别
                id: null,
                relationId: 4,
                value: null
            },
            profile: { // 个人简介
                id: null,
                relationId: 5,
                value: ''
            },
            qrcode: { // 二维码
                id: null,
                relationId: 6,
                value: null
            },
            heartSafteyAccount: {
                id: null,
                relationId: 7,
                value: '---'
            }, // 心安号
        };
    }

    getUserInfo() {
        var user = wilddog.auth().currentUser;
        if (user != null) {
            this.userInfo.email  = user.email;
            this.userInfo.mobile  = user.phone
            this.userInfo.userId = user.uid; 
        } else {
        // 没有用户信息
            let userInfo =  JSON.parse(window.localStorage.getItem('userInfo'))
            this.userInfo.mobile =  userInfo.phone
        }
        // this.apollo.watchQuery<any>({
        //     query: findCurrentUserInfo
        // }).valueChanges.subscribe((val) => {
        //     console.log(val);
        //     if (val && val.data && val.data.findCurrentUserInfo) {
        //         const user = val.data.findCurrentUserInfo;
        //         if (user && user.data) {
        //             const info = user.data;
        //             this.userInfo.userId = info.userId;
        //             this.userInfo.mobile = info.mobile;
        //             this.userInfo.email = info.email;
        //             this.userInfo.createTime = info.createTime;
        //             this.userInfo.openId = info.openId;
        //             info.userInfos.forEach((item) => {
        //                 switch (item.name) {
        //                     case 'nickname':
        //                         this.userInfo.nickname = {
        //                             id: item.id,
        //                             relationId: item.relationId,
        //                             value: item.value || '我的昵称'
        //                         };
        //                         break;
        //                     case 'avatar':
        //                         this.userInfo.avatar = {
        //                             id: item.id,
        //                             relationId: item.relationId,
        //                             value: item.value || '../../assets/imgs/img_avatar_default.png'
        //                         };
        //                         break;
        //                     case 'backgroundImg':
        //                         this.userInfo.backgroundImg = {
        //                             id: item.id,
        //                             relationId: item.relationId,
        //                             value: item.value || '../../assets/imgs/donationed.png'
        //                         };
        //                         break;
        //                     case 'sex':
        //                         this.userInfo.sex = {
        //                             id: item.id,
        //                             relationId: item.relationId,
        //                             value: item.value || 'male'
        //                         };
        //                         break;
        //                     case 'profile':
        //                         this.userInfo.profile = {
        //                             id: item.id,
        //                             relationId: item.relationId,
        //                             value: item.value || ''
        //                         };
        //                         break;
        //                     case 'qrcode':
        //                         this.userInfo.qrcode = {
        //                             id: item.id,
        //                             relationId: item.relationId,
        //                             value: item.value
        //                         };
        //                         break;
        //                     case 'heartSafteyAccount':
        //                         this.userInfo.qrcode = {
        //                             id: item.id,
        //                             relationId: item.relationId,
        //                             value: item.value || '--'
        //                         };
        //                         break;
        //                 }
        //             });

        //             this.storeUserInfo();
        //         }
        //     }
        // }, () => {
        //     if (window.localStorage.getItem('userInfo')) {
        //         this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        //     }
        // });
    }

    // 存储userInfo
    storeUserInfo() {
        const userInfoStorage = {
            userId: this.userInfo.userId,
            certifying: this.userInfo.certifying,
            mobile: this.userInfo.mobile,
            email: this.userInfo.email,
            createTime: this.userInfo.createTime,
            openId: this.userInfo.openId,

            nickname: JSON.stringify(this.userInfo.nickname),
            avatar: JSON.stringify(this.userInfo.avatar),
            backgroundImg: JSON.stringify(this.userInfo.backgroundImg),
            sex: JSON.stringify(this.userInfo.sex),
            profile: JSON.stringify(this.userInfo.profile),
            qrcode: JSON.stringify(this.userInfo.qrcode),
            heartSafteyAccount: JSON.stringify(this.userInfo.heartSafteyAccount)
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfoStorage));
    }


    upHead() {

    }

    jumpTo(url, param?: any, queryParams?: any) {

        if (localStorage.getItem('userInfo')) {
            if (queryParams) {
                this.router.navigate([url], { queryParams: queryParams });
            } else if (param) {
                this.router.navigate([url, param]);
            } else {
                this.router.navigate([url]);
            }
        } else {
            this.alertMessage('', '您还未登录，请登录后查看.', ['好的']);
        }

    }

    async presentLoading(msg: string) {
        const loading = await this.loadingCtrl.create({
            message: msg,
            duration: 2000,
            showBackdrop: true  // 是否显示遮罩层
        });
        return await loading.present();
    }

    async showToast(msg: string, pos: any = 'bottom') {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: pos,
            cssClass: 'auth-toast',
            translucent: true
        });
        await toast.present();
    }

    async showErrorToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle',
            cssClass: 'auth-error-toast',
            translucent: true
        });
        await toast.present();
    }

    async alertMessage(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons,
            keyboardClose: true
        });
        await alert.present();
    }

    building() {
        this.alertMessage('提示', '感谢您的支持，您尚未获得此功能的使用权限，请耐心等待平台开放', [
            {
                text: '好的',
                role: 'cancel',
                cssClass: 'secondary'
            }]);
    }


    // 绑定微信
    bindWechat() {
        if (localStorage.getItem('userInfo')) {
            this.wechatAlert = this.alertMessage('提示',
                this.userInfo.openId === null ? '您的账号尚未绑定微信，是否确定去绑定微信？' : '您的账号已经绑定微信，是否确定更换微信绑定？',
                [{
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: '确定',
                    cssClass: 'secondary',
                    handler: () => {
                        this.loading = this.presentLoading('获取微信授权中...');
                        try {
                            Wechat.isInstalled((installed) => {
                                if (installed) {
                                    const scope = 'snsapi_userinfo',
                                        state = '_' + (+new Date());
                                    Wechat.auth(scope, state, (response) => {
                                        this.apollo.mutate({
                                            mutation: bindWeChat,
                                            variables: {
                                                authCode: response.code
                                            }
                                        }).subscribe((res: any) => {
                                            if (res.data.bindWeChat) {
                                                const send = res.data.bindWeChat;
                                                if (send.code === 200) {
                                                    this.router.navigate(['/info/bind-wechat']);
                                                    this.showToast('微信绑定成功，请稍后重新登录');
                                                } else {
                                                    this.showErrorToast(send.message);
                                                }
                                            }
                                        }, (err) => {
                                            // alert('err #' + err);
                                            this.showErrorToast('出现错误啦，请稍后重试');
                                        });
                                    }, (reason) => {
                                        alert('Failed: ' + reason);
                                    });
                                } else {
                                    this.showErrorToast('您的设备尚未安装微信，请先去安装');
                                }
                            }, (reason) => {
                                alert('Failed: ' + reason);
                            });
                        } catch (error) {
                            alert(error);
                        } finally {
                            this.loading.dismiss();
                            // alert('finally');
                        }
                    }
                }]
            );
        } else {
            this.alertMessage('', '您还未登录，请登录后查看.', ['好的']);
        }
    }

    async changeBackground() {
        if (localStorage.getItem('userInfo')) {
            console.log('开始更换背景');
            const actionSheet = await this.actionSheetController.create({
                buttons: [{
                    text: '拍照',
                    handler: () => {
                        console.log('拍照');
                        this.cameraAndImagePicker.takePicture().then((imageData) => {
                            const res = [];
                            res.push(imageData);
                            this.doUpload(res);
                            this.presentLoadingWithOptions();
                            // imageData is either a base64 encoded string or a file URI
                            // If it's base64 (DATA_URL):
                            //    let base64Image = 'data:image/jpeg;base64,' + imageData;
                        }, (err) => {
                            console.log('Error occurred while taking a picture', err);
                        });
                    }
                }, {
                    text: '从相册选择图片',
                    handler: () => {
                        console.log('从相册选择图片');
                        this.cameraAndImagePicker.imageFun(1).then((results) => {
                            // for (let i = 0; i < results.length; i++) {
                            this.doUpload(results);
                            this.presentLoadingWithOptions();
                            // }
                        }, (err) => {
                            console.log('Error occurred while taking a picture', err);
                        });
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('取消');
                    }
                }]
            });
            await actionSheet.present();
        }

    }

    // 上传图片
    doUpload(filePath) {
        this.fileUpload.startUpload(filePath);
        this.fileUpload.getFileUploadChange().subscribe((fileObj) => {
            if (fileObj) {
                const url = 'http://' + fileObj;
                this.userInfo.backgroundImg.value = url;
                this.loading.dismiss();
            }
        });
    }

    async presentLoadingWithOptions() {
        const loading = await this.loadingCtrl.create({
            spinner: 'lines',
            duration: 3000,
            message: '图片获取中... ...', // 新版本content 跟新为 message
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
    }
}
