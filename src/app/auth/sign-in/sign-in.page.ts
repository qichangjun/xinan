import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

import { Apollo } from 'apollo-angular';
import { sendValidationCode, verificationCodeLogin, login, weChatLogin } from '../../shared/graphql-tag';
import { Router, ActivatedRoute, DefaultUrlSerializer } from '@angular/router';
import { SignService } from './sign-in.service'
declare var wilddog: any;
// 引入微信服务
declare var Wechat: any;
declare var hex_md5: any;
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.page.html',
    styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

    method = 0; // 登陆方式 0:密码登录 1:验证码登录 2:微信登录

    eyeshow1: boolean;
    eyeshow2: boolean;
    phone = '';
    uuid = '';

    data = {
        ok: false,
        phone: '',
        password1: '',
        password2: '',
        code: '',
        status: true,	// 获取验证码按钮的启用禁用状态
        time: 59,
        info: '短信验证码'
    };

    vertify_pass = {
        ok: false,
        phone: '',
        password: '',
        repassword: ''
    };

    vertify_code = {
        ok: false,
        phone: '',
        code: '',
        status: true,	// 获取验证码按钮的启用禁用状态
        time: 59,
        info: '短信验证码'
    };

    timer = null; // 获取验证码定时器

    loading;

    constructor(
        private signService: SignService,
        private toastCtrl: ToastController,
        private apollo: Apollo,
        private loadingCtrl: LoadingController,
        private router: Router
    ) { }

    ngOnInit() {
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
        toast.present();
    }

    async showErrorToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle',
            cssClass: 'auth-error-toast',
            translucent: true
        });
        toast.present();
    }

    helpInfo() {
        this.showToast('如果您所填手机号未注册过APP，请使用”验证码登录“来进行新用户注册并设置您的密码。', 'middle');
    }

    ionFocus(event) {
        console.log(event);
        // this.focusClass = event.
    }

    // check
    check(name: string, errors: any) {
        if (errors === null) {
            return true;
        } else {
            if (name === 'required' && 'required' in errors) {// required
                return false;
            } else if (name === 'minlength' && 'minlength' in errors) { // minlength
                return false;
            } else if (name === 'maxlength' && 'maxlength' in errors) { // maxlength
                return false;
            } else if (name === 'pattern' && 'pattern' in errors) { // pattern
                return false;
            } else {
                return true;
            }
        }
    }

    // 验证码登录时验证用户输入是否有误
    checkCode(errors) {
        if (!this.check('required', errors[0])) {
            this.showErrorToast('手机号码不能为空');
            this.vertify_code.ok = false;
        } else if (!this.check('pattern', errors[0])) {
            this.showErrorToast('手机号码格式不正确');
            this.vertify_code.ok = false;
        } else if (!this.check('required', errors[1])) {
            this.showErrorToast('验证码不能为空');
            this.vertify_code.ok = false;
        } else if (!this.check('minlength', errors[1])) {
            this.showErrorToast('验证码为六位验证码');
            this.vertify_code.ok = false;
        } else if (this.data.password1 !== this.data.password2) {
            this.showErrorToast('两次密码输入不一致');
            this.vertify_code.ok = false;
        }else {
            this.vertify_code.ok = true;
        }
    }

    // 密码登录时验证用户输入是否有误
    checkPass(errors) {
        if (!this.check('required', errors[0])) {
            this.showErrorToast('手机号码不能为空');
            this.vertify_pass.ok = false;
        } else if (!this.check('pattern', errors[0])) {
            this.showErrorToast('手机号码格式不正确');
            this.vertify_pass.ok = false;
        } else if (!this.check('required', errors[1])) {
            this.showErrorToast('密码不能为空');
            this.vertify_pass.ok = false;
        } else if (!this.check('minlength', errors[1]) || !this.check('maxlength', errors[1]) || !this.check('pattern', errors[1])) {
            this.showErrorToast('密码格式应为6～12位数字、英文、或数字英文组合');
            this.vertify_pass.ok = false;
        } else {
            this.vertify_pass.ok = true;
        }

    }

    //点击密码注册
    createInPass(formValue, errors) {
        this.checkPass(errors);
        if (this.vertify_pass.ok) {
            wilddog.auth().createUserWithPhoneAndPassword(formValue.phone, formValue.password).then((user) => {
                // 获取用户
                console.log(user);
                if (user && user.uid) {
                    localStorage.setItem('token', user.__authManager.Wa.idToken);
                    localStorage.setItem('userInfo', JSON.stringify(user));
                    this.back();
                    this.showToast('登陆成功');
                }
            }).catch((error) => {
                // 错误处理
                console.log(error);
                this.showErrorToast(error.message)
            });
        }
    }

    // 点击密码登录按钮
    async toSignInPass(formValue, errors) {
        // 检查用户输入是否有误
        this.checkPass(errors);
        if (this.vertify_pass.ok) {
            try {
                let res = await this.signService.signInWithPassword(formValue.phone, formValue.password)
                if (res) {
                    this.showToast('登陆成功')
                    let token = res.token
                    localStorage.setItem('token', token);
                    localStorage.setItem('userInfo', JSON.stringify(res.user));
                    this.back();
                }
            } catch (err) {
                this.showErrorToast(err)
            }
        }
    }

    // 点击验证码登录按钮
    async toSignInCode(formValue, errors) {
        // 检查用户输入是否有误
        this.checkCode(errors);
        if (this.vertify_code.ok) {
            try {
                let res = await this.signService.signIn(formValue.phone, formValue.code, this.uuid,formValue.password1)
            } catch (err) {
                this.showErrorToast(err)
            }

        }
    }

    // 获取验证码
    async getCode(valid) {
        const btnStatus = valid && this.vertify_code.status;
        if (btnStatus && this.timer === null) {
            try {
                let res = await this.signService.getCode(this.data.phone)
                this.uuid = res
                this.vertify_code.status = false;
                this.timer = setInterval(() => {
                    if (this.vertify_code.status === false && this.vertify_code.time > 0) {
                        this.vertify_code.info = '短信验证码(' + this.vertify_code.time-- + 's)';
                    } else {
                        this.stop_timer(0);
                    }
                }, 1000);
                this.showToast('验证码已经发送，注意查看')
            } catch (err) {
                this.showErrorToast(err);
                return
            }


        } else if (!valid) {
            this.showErrorToast('手机号码为空或格式错误');
            if (this.timer !== null) { this.stop_timer(1); }
        }
    }

    // 关闭定时器
    stop_timer(type) {
        if (this.timer) {
            // 0 超时重新获取
            // 1 初始化 获取验证码
            this.vertify_code.info = type === 0 ? '重新获取' : (type === 1 ? '短信验证码' : '短信验证码');
            this.vertify_code.time = 59;
            this.vertify_code.status = true;

            clearInterval(this.timer);
            this.timer = null;
        }
    }


    // 微信登陆
    signInWechat() {
        this.loading = this.presentLoading('微信登录中...');
        try {
            Wechat.isInstalled((installed) => {
                // alert('Wechat installed: ' + (installed ? 'Yes' : 'No'));
                if (installed) {
                    const scope = 'snsapi_userinfo',
                        state = '_' + (+new Date());
                    Wechat.auth(scope, state, (response) => {
                        this.apollo.watchQuery<any>({
                            query: weChatLogin,
                            variables: {
                                authCode: response.code
                            }
                        }).valueChanges.subscribe((val) => {
                            if (val && val.data && val.data.weChatLogin) {
                                const send = val.data.weChatLogin;
                                // alert('send #' + JSON.stringify(send));
                                if (send.code === 200 && send.data && send.data.token) {
                                    localStorage.setItem('token', send.data.token.accessToken);
                                    if (send.data.newUser) {
                                        this.router.navigate(['/bind-phone']);
                                        this.clear();
                                        this.showToast('微信登录授权成功，请绑定手机');
                                    } else {
                                        this.back();
                                        this.showToast(send.message);
                                    }
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

    // 重置数据
    clear() {
        this.method = 1;
        this.data.phone = '';
        this.vertify_pass = {
            ok: false,
            phone: '',
            password: '',
            repassword: ''
        };
        this.vertify_code = {
            ok: false,
            phone: '',
            code: '',
            status: true,
            time: 59,
            info: '短信验证码'
        };
        this.stop_timer(1);
    }

    // 关闭登录页面
    back() {
        this.clear();
        // window.history.back();
        // console.log('back');
        // this.navCtrl.navigateBack('/tabs/(me:me)');
        // this.router.navigate(['/tabs'], { queryParams: { id: 4 } });
        this.router.navigate(['/']);
    }


}
