import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { sendValidationCode, resetPassword, verifyPassword, updateCurrentUserInfo } from '../../shared/graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';
import { SignService } from '../sign-in/sign-in.service';
@Component({
    selector: 'app-modify-pass',
    templateUrl: './modify-pass.component.html',
    styleUrls: ['./modify-pass.component.scss']
})
export class ModifyPassComponent implements OnInit {
    type = true; // 修改登录密码 true: 验证码方式 false: 旧密码方式
    reqId = '';
    userInfo: any; // 当前用户信息
    img = '../../../assets/imgs/img_avatar_default.png'; // 默认头像

    data_code = {
        ok: false,
        phone: '',
        password1: '',
        password2: '',
        code: '',
        status: true,	// 获取验证码按钮的启用禁用状态
        time: 59,
        info: '短信验证码'
    };
    eyeshow1: boolean;
    eyeshow2: boolean;

    timer = null; // 获取验证码定时器

    data_pass = {
        oldpass: '',
        password1: '',
        password2: ''
    };
    eyeshow3: boolean;
    eyeshow4: boolean;


    constructor(
        private toastCtrl: ToastController,
        private apollo: Apollo,
        private activedRoute: ActivatedRoute,
        private router: Router,
        private signService : SignService
    ) {
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        //this.userInfo = this.activedRoute.queryParams['value'];
        this.data_code.phone = this.userInfo.mobile;
    }

    ngOnInit() {
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
            duration: 3000,
            position: 'middle',
            cssClass: 'auth-error-toast',
            translucent: true
        });
        toast.present();
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

    // 检查用户输入是否有误 - 手机号验证码
    checkCode(errors) {
        // console.log(errors);
        // 0:手机号码 1:新密码 2:验证码
        if (!this.check('required', errors[0])) {
            this.showErrorToast('手机号码不能为空');
            this.data_code.ok = false;
        } else if (!this.check('pattern', errors[0])) {
            this.showErrorToast('手机号码格式不正确');
            this.data_code.ok = false;
        } else if (!this.check('required', errors[1])) {
            this.showErrorToast('密码不能为空');
            this.data_code.ok = false;
        } else if (!this.check('minlength', errors[1]) || !this.check('maxlength', errors[1]) || !this.check('pattern', errors[1])) {
            this.showErrorToast('密码格式应为6～12位数字、英文、或数字英文组合');
            this.data_code.ok = false;
        } else if (this.data_code.password1 !== this.data_code.password2) {
            this.showErrorToast('两次密码输入不一致');
            this.data_code.ok = false;
        } else if (!this.check('required', errors[2])) {
            this.showErrorToast('验证码不能为空');
            this.data_code.ok = false;
        } else if (!this.check('minlength', errors[2])) {
            this.showErrorToast('验证码至少为四位');
            this.data_code.ok = false;
        } else {
            this.data_code.ok = true;
        }
    }

    // 检查用户输入是否有误 - 原密码
    checkPass(errors, cb: Function) {
        // 0:原密码 1:新密码
        if (!this.check('required', errors[0])) {
            this.showErrorToast('原密码不能为空');
            cb(false);
        } else {
            // 验证原密码是否正确
            this.apollo.watchQuery<any>({
                query: verifyPassword,
                variables: {
                    password: this.data_pass.oldpass
                }
            }).valueChanges.subscribe((val) => {
                // console.log(val);
                if (val && val.data && val.data.verifyPassword) {
                    const send = val.data.verifyPassword;
                    if (send.code === 200 && send.message) {
                        if (!this.check('required', errors[1])) {
                            this.showErrorToast('新密码不能为空');
                            cb(false);
                        } else if (!this.check('minlength', errors[1])
                            || !this.check('maxlength', errors[1]) || !this.check('pattern', errors[1])) {
                            this.showErrorToast('密码格式应为6～12位数字、英文、或数字英文组合');
                            cb(false);
                        } else if (this.data_pass.password1 !== this.data_pass.password2) {
                            this.showErrorToast('两次密码输入不一致');
                            cb(false);
                        } else {
                            cb(true);
                        }
                    } else {
                        this.showErrorToast('原' + send.message);
                        cb(false);
                    }
                }
            });
        }
    }

    // 重置密码 - 手机号验证码
    toResetPass(formValue, errors) {
        // console.log(formValue);
        // 检查用户输入是否有误
        this.checkCode(errors);

        if (this.data_code.ok) {
            this.apollo.mutate({
                mutation: resetPassword,
                variables: {
                    mobile: this.data_code.phone,
                    validationCode: formValue.code,
                    password: formValue.password1
                }
            }).subscribe((val) => {
                // console.log(val);
                if (val && val.data && val.data.resetPassword) {
                    const send = val.data.resetPassword;
                    if (send.code === 200) {
                        this.back();
                        this.showToast('密码修改成功，请重新登录');
                    } else {
                        this.showErrorToast(send.message);
                    }
                }
            });
        }
    }

    // 获取验证码
    async getCode(valid) {
        const btnStatus = !valid && this.data_code.status;
        if (btnStatus && this.timer === null) {
            try{
                let res = await this.signService.getCode(this.data_code.phone)
                this.reqId = res.RequestId
                this.timer = setInterval(() => {
                    if (this.data_code.status === false && this.data_code.time > 0) {
                        this.data_code.info = '短信验证码(' + this.data_code.time-- + 's)';
                    } else {
                        this.stop_timer(0);
                    }

                }, 1000);
                this.showToast('验证码已经发送，注意查看');
            }catch(err){
                this.showErrorToast(err);
                return 
            }   
            // this.apollo.mutate({
            //     mutation: sendValidationCode,
            //     variables: {
            //         mobile: this.data_code.phone
            //     }
            // }).subscribe((res: any) => {
            //     // console.log(res);
            //     if (res.data.sendValidationCode) {
            //         const send = res.data.sendValidationCode;
            //         if (send.code === 200) {
            //             this.data_code.status = false;
            //             this.timer = setInterval(() => {
            //                 if (this.data_code.status === false && this.data_code.time > 0) {
            //                     this.data_code.info = '短信验证码(' + this.data_code.time-- + 's)';
            //                 } else {
            //                     this.stop_timer(0);
            //                 }

            //             }, 1000);
            //             this.showToast('验证码已经发送，注意查看');
            //         } else {
            //             this.showErrorToast(send.message);
            //         }
            //     }
            // });

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
            this.data_code.info = type === 0 ? '重新获取' : (type === 1 ? '短信验证码' : '短信验证码');
            this.data_code.time = 59;
            this.data_code.status = true;

            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // 重置密码 - 原密码
    async toResetPass2(formValue, errors) {
        // console.log(formValue);
        // 检查用户输入是否有误
        this.checkPass(errors, async (flag) => {
            if (flag) {
                try{
                    await this.signService.resetPass(this.data_code.phone,formValue.password1,this.data_code.code,this.reqId)
                    this.back();
                }catch(err){
                    this.showErrorToast(err);
                }
                

                // this.apollo.mutate({
                //     mutation: updateCurrentUserInfo,
                //     variables: {
                //         updateCurrentUserInput: {
                //             password: formValue.password1
                //         }
                //     }
                // }).subscribe((val) => {
                //     // console.log(val);
                //     if (val && val.data && val.data.updateCurrentUserInfo) {
                //         const send = val.data.updateCurrentUserInfo;
                //         if (send.code === 200) {
                //             this.back();
                //             this.showToast('密码修改成功，请重新登录');
                //         } else {
                //             this.showErrorToast(send.message);
                //         }
                //     }
                // });
            }
        });
    }

    // 关闭登录页面
    back() {
        // 重置数据
        this.clear();
        // 退出登录
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        this.router.navigate(['/']);
    }

    clear() {
        this.data_code = {
            ok: false,
            phone: this.userInfo.mobile,
            password1: '',
            password2: '',
            code: '',
            status: true,	// 获取验证码按钮的启用禁用状态
            time: 59,
            info: '短信验证码'
        };
        this.stop_timer(1);

        this.data_pass = {
            oldpass: '',
            password1: '',
            password2: ''
        };
    }

}
