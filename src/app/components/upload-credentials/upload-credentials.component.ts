import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import Hammer from 'hammerjs';

import { CameraAndImagePickerServices } from './../../shared/cameraAndImagePickers.service';
import { FileUploadService } from './../../shared/file-upload.service';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'upload-credentials',
    templateUrl: './upload-credentials.component.html',
    styleUrls: ['./upload-credentials.component.scss']
})
export class UploadCredentialsComponent implements OnInit, OnDestroy {

    credentials = '';

    _hammer;
    pan;
    press;
    pressup;
    tap;

    loading;

    constructor(
        private elementRef: ElementRef,
        public loadingCtrl: LoadingController,
        private fileUpload: FileUploadService,
        private cameraAndImagePicker: CameraAndImagePickerServices,
    ) { }

    ngOnInit() {
        const element = this.elementRef.nativeElement;
        this._hammer = new Hammer.Manager(element, {
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
                [Hammer.Press],
                [Hammer.Tap],
            ],
        });

        this._hammer.on('pan', this.pan);
        this._hammer.on('press', this.press);
        this._hammer.on('pressup', this.pressup);
        this._hammer.on('tap', this.tap);
    }

    ngOnDestroy() {
        if (this._hammer) {
            this._hammer.off('pan', this.pan);
            this._hammer.off('press', this.press);
            this._hammer.off('pressup', this.pressup);
            this._hammer.off('tap', this.tap);

            this._hammer.destroy();
            this._hammer = null;
        }
    }

    // 上传证件
    upload(event, device, type) {
        if (device === 'photos') { // 从相册选取照片
            this.cameraAndImagePicker.imageFun(1).then((results) => {
                for (let i = 0; i < results.length; i++) {
                    this.doUpload(results, type);
                    this.presentLoadingWithOptions();
                }
            }, (err) => {
                console.log('Error occurred while taking a picture', err);
            });
        } else if (device === 'camera') { // 打开相机拍照
            this.cameraAndImagePicker.takePicture().then((imageData) => {
                const res = [];
                res.push(imageData);
                this.doUpload(res, type);
                this.presentLoadingWithOptions();
                // imageData is either a base64 encoded string or a file URI
                // If it's base64 (DATA_URL):
                //    let base64Image = 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
                console.log('Error occurred while taking a picture', err);
            });
        }
    }


    // 上传图片
    doUpload(filePath, type) {
        this.fileUpload.startUpload(filePath, type);
        this.fileUpload.getFileUploadChangeObj().subscribe((fileObj) => {
            console.log(fileObj);
            if (fileObj.imgUrl) {
                const url = 'http://' + fileObj.imgUrl;
                this.credentials = url;
                this.loading.dismiss();
            }
        });
    }

    // 删除图片
    clear() {
        this.credentials = '';
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
