import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import Hammer from 'hammerjs';

import { CameraAndImagePickerServices } from '../../shared/cameraAndImagePickers.service';
import { FileUploadService } from '../../shared/file-upload.service';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { apiUrlService } from '../../shared/apiUrl.service'
@Component({
    selector: 'upload-head',
    templateUrl: './upload-head.component.html',
    styleUrls: ['./upload-head.component.scss']
})
export class UploadHeadComponent implements OnInit {

    // credentials = '';
    userInfo = {
        avatar: '',
    };
    loading;

    constructor(
        public _apiUrlService:apiUrlService,
        private transfer: FileTransfer,
        public actionSheetController: ActionSheetController,
        private fileUpload: FileUploadService,
        private cameraAndImagePicker: CameraAndImagePickerServices,
        private elementRef: ElementRef,
        public loadingCtrl: LoadingController,
    ) { }

    ngOnInit() {
    }
    fileTransfer: FileTransferObject = this.transfer.create();
    async presentActionSheet() {
        console.log('开始更换头像');
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

    // 上传图片
    doUpload(filePath) {
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'avater.jpg',
            headers: {
                Authorization : "Bearer "+window.localStorage.getItem('token')
            }
         }
         this.fileTransfer.upload(filePath, this._apiUrlService.baseUrl + this._apiUrlService.uploadAvater, options)
          .then((data) => {
            // success
            this.loading.dismiss();
          }, (err) => {
            // error
            alert(err)
            this.loading.dismiss();
          })
        // this.fileUpload.startUpload(filePath);
        // this.fileUpload.getFileUploadChange().subscribe((fileObj) => {
        //     if (fileObj) {
        //         const url = 'http://' + fileObj;
        //         this.userInfo.avatar = url;
        //         // this.imgs.push(url);
        //         // if (this.imgs.length > 1) {
        //         //     this.isAdd = false;
        //         // }
        //         this.loading.dismiss();
        //     }
        // });
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
