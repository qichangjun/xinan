import { Injectable } from '@angular/core';
// 调用照相机
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// 调用相册
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Injectable({
    providedIn: 'root'
})
export class CameraAndImagePickerServices {

    constructor(
        private imagePicker: ImagePicker,
        private camera: Camera,
    ) { }

    imageFun(ImagesCount) {
        this.imagePicker.requestReadPermission().then((results) => {
            console.log(results);
            console.log(JSON.stringify(results));
        }, (err) => {
            //
        });
        // 从相册选择图片
        const options = {
            maximumImagesCount: ImagesCount,
            title: '选择图片',
            allowEdit: true,
            // outputType: 1,
            message: '', // optional default no helper message above the picker UI
            // be careful with these options as they require additional processing
            width: 400,
            quality: 80
            //             outputType: imagePicker.OutputType.BASE64_STRING
        };
        // 获取图片方法
        return this.imagePicker.getPictures(options);
    }

    takePicture() {
        // 定义相机参数
        const options: CameraOptions = {
            quality: 90, // 图片的质量
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 400
        };
        // 获取图片方法
        return this.camera.getPicture(options);
    }

}
