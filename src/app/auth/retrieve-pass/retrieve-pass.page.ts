import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { sendValidationCode, resetPassword } from '../../shared/graphql-tag';
import { Router } from '@angular/router';
import { SignService } from '../sign-in/sign-in.service'
declare var hex_md5 : any;
@Component({
    selector: 'app-retrieve-pass',
    templateUrl: './retrieve-pass.page.html',
    styleUrls: ['./retrieve-pass.page.scss'],
})
export class RetrievePassPage implements OnInit {

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
    eyeshow1: boolean;
    eyeshow2: boolean;
    uuid : '';

    timer = null; // 获取验证码定时器

    constructor(
        private toastCtrl: ToastController,
        private apollo: Apollo,
        private router: Router,
        private signService : SignService
    ) { }

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

    // 检查用户输入是否有误
    checkAll(errors) {
        // 0:手机号码 1:新密码 2:验证码
        if (!this.check('required', errors[0])) {
            this.showErrorToast('手机号码不能为空');
            this.data.ok = false;
        } else if (!this.check('pattern', errors[0])) {
            this.showErrorToast('手机号码格式不正确');
            this.data.ok = false;
        } else if (!this.check('required', errors[1])) {
            this.showErrorToast('密码不能为空');
            this.data.ok = false;
        } else if (!this.check('minlength', errors[1]) || !this.check('maxlength', errors[1]) || !this.check('pattern', errors[1])) {
            this.showErrorToast('密码格式应为6～12位数字、英文、或数字英文组合');
            this.data.ok = false;
        } else if (this.data.password1 !== this.data.password2) {
            this.showErrorToast('两次密码输入不一致');
            this.data.ok = false;
        } else if (!this.check('required', errors[2])) {
            this.showErrorToast('验证码不能为空');
            this.data.ok = false;
        } else if (!this.check('minlength', errors[2])) {
            this.showErrorToast('验证码至少为四位');
            this.data.ok = false;
        } else {
            this.data.ok = true;
        }
    }

    // 重置密码
    async toResetPass(formValue, errors) {
        // 检查用户输入是否有误
        this.checkAll(errors);
        if (this.data.ok) {
            try{
                await this.signService.resetPass(formValue.phone,formValue.password1,formValue.code,this.uuid)
                this.showToast('密码重置成功')
                this.back();
            }catch(err){
                this.showErrorToast(err);
            }
        }
    }

    // 获取验证码
    async getCode(valid) {
        const btnStatus = valid && this.data.status;
        if (btnStatus && this.timer === null) {
            try{
                let res = await this.signService.getCode(this.data.phone)
                this.uuid = res
                this.data.status = false;
                this.timer = setInterval(() => {
                    if (this.data.status === false && this.data.time > 0) {
                        this.data.info = '短信验证码(' + this.data.time-- + 's)';
                    } else {
                        this.stop_timer(0);
                    }
                }, 1000);
                this.showToast('验证码已经发送，注意查看')
            }catch(err){
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
            this.data.info = type === 0 ? '重新获取' : (type === 1 ? '短信验证码' : '短信验证码');
            this.data.time = 59;
            this.data.status = true;

            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // 返回登录页面
    back() {
        this.clear();
        // window.history.back();
        this.router.navigate(['/auth/sign-in']);
    }

    clear() {
        this.data = {
            ok: false,
            phone: '',
            password1: '',
            password2: '',
            code: '',
            status: true,	// 获取验证码按钮的启用禁用状态
            time: 59,
            info: '短信验证码'
        };
        this.stop_timer(1);
    }
}
