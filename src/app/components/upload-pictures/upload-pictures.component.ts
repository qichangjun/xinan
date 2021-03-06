import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';

import { CameraAndImagePickerServices } from './../../shared/cameraAndImagePickers.service';
import { FileUploadService } from './../../shared/file-upload.service';

@Component({
    selector: 'upload-pictures',
    templateUrl: './upload-pictures.component.html',
    styleUrls: ['./upload-pictures.component.scss']
})
export class UploadPicturesComponent implements OnInit {

    imgs = [];
    loading;
    isAdd = true;

    constructor(
        public actionSheetController: ActionSheetController,
        public loadingCtrl: LoadingController,
        private fileUpload: FileUploadService,
        private cameraAndImagePicker: CameraAndImagePickerServices,
    ) { }

    ngOnInit() {
    }

    close(i) {
        this.imgs[i] = '';
    }

    async presentActionSheet() {
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
        this.fileUpload.startUpload(filePath);
        this.fileUpload.getFileUploadChange().subscribe((fileObj) => {
            if (fileObj) {
                const url = 'http://' + fileObj;
                this.imgs.push(url);
                if (this.imgs.length > 9) {
                    this.isAdd = false;
                }
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
