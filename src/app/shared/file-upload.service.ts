import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
// 图片上传
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    uploadFile = gql`
        mutation uploadFile(
            $md5: String!,
            $contentName: String!
        ){
            uploadProcess(
               bucketName: "src-lianhao",
               md5: $md5,
               contentName: $contentName
            ){
                code,
                message,
                url,
                method,
                baseUrl,
                form{
                    authorization,
                    policy
                }
            }
        }
    `;

    getFileMD5 = gql`
        query getFileMD5(
            $base64: String!
        ){
            getFileMD5(
                base64: $base64
            ){
                code
                message
                md5
            }
        }
    `;

    fileDomain = '';
    fileUrls: Array<string> = [];
    errors: Array<string> = [];
    imgUrlArr: string;
    type: String = '';

    private frontPic: Subject<any> = new Subject<any>();
    private behindPic: Subject<any> = new Subject<any>();
    private fileUploadChange: Subject<any> = new Subject<any>();

    constructor(
        private http: HttpClient,
        private transfer: FileTransfer,
        private apollo: Apollo,
        private base64: Base64
    ) {
        this.fileUploadChange = new Subject<any>();
    }

    setFrontPic(fileUrl: string) {
        this.frontPic.next(fileUrl);
    }

    getFrontPice() {
        return this.frontPic.asObservable();
    }

    setBehindPic(fileUrl: string) {
        this.behindPic.next(fileUrl);
    }

    setHandheld(fileUrl: string) {
        this.frontPic.next(fileUrl);
    }

    getHandheld() {
        return this.frontPic.asObservable();
    }

    getBehindPic() {
        return this.behindPic.asObservable();
    }

    setFileUploadChange(fileUrl: string) {
        this.fileUploadChange.next(fileUrl);
    }

    getFileUploadChange() {
        return this.fileUploadChange.asObservable();
    }

    setFileUploadChangeObj(fileobj: object) {
        this.fileUploadChange.next(fileobj);
    }

    getFileUploadChangeObj() {
        return this.fileUploadChange.asObservable();
    }

    startUpload(files, type?) {
        this.type = '';
        if (type) {
            this.type = type;
        }
        this.fileUrls = [];
        this.errors = [];
        for (const file of files) {
            this.base64.encodeFile(file).then((base64File: string) => {
                this.getMD5(base64File, file);
            }, (err) => {
                console.log(err);
            });
        }
    }

    getMD5(base64File, filePath) {
        this.apollo.watchQuery<any>({
            query: this.getFileMD5,
            variables: {
                base64: base64File
            }
        }).valueChanges.subscribe((val) => {
            if (val && val.data && val.data.getFileMD5) {
                const fileM = val.data.getFileMD5;
                this.upYPY(fileM.md5, filePath);
            }
        });
    }

    upYPY(md5, filePath) {
        this.apollo.mutate({
            mutation: this.uploadFile,
            variables: {
                md5,
                contentName: 'img1.png'
            }
        }).subscribe(({ data }) => {
            if (data.uploadProcess.code === 200) {
                this.upyunUpload(filePath, data.uploadProcess);
            } else {
                this.errors.push(data.uploadProcess.message);
            }
        }, (error) => {
            this.errors.push(error);
        });
    }

    upyunUpload(filePath, { baseUrl, url, form: { policy, authorization } }) {
        const fileTransfer: FileTransferObject = this.transfer.create();
        const options: FileUploadOptions = {
            fileKey: 'file', // input type=file
            fileName: '测试.jpg', // 上传的图片名称
            // mimeType: 'image/jpeg', // 上传的图片类型
            params: { // 给服务器post的数据
                policy,
                authorization
            }
        };
        // url '上传图片的地址';
        fileTransfer.upload(filePath, url, options)
            .then(
                (data) => {
                    const response = data.response;
                    if (response) {
                        const imgUrl = baseUrl + JSON.parse(response).url;
                        // type: front:正面 behind:背面 handheld:手持
                        if (this.type) {
                            if (this.type === 'front') {
                                this.setFrontPic(imgUrl);
                            } else if (this.type === 'behind') {
                                this.setBehindPic(imgUrl);
                            } else if (this.type === 'handheld') {
                                this.setHandheld(imgUrl);
                            } else {
                                this.setFileUploadChangeObj({
                                    'imgUrl': imgUrl,
                                    'index': this.type
                                });
                            }
                        } else {
                            this.setFileUploadChange(imgUrl);
                        }
                    }
                    // alert(JSON.stringify(data));
                    console.log(JSON.stringify(data));
                },
                (err) => {
                    alert('error');
                    // console.log(JSON.stringify(err));
                    alert(JSON.stringify(err));
                }
            );
    }
    // upyunUpload(file, { url, form: { policy, authorization } }) {
    //     const formData = new FormData();
    //     formData.append('file', file, file.name);
    //     formData.append('policy', policy);
    //     formData.append('authorization', authorization);

    //     this.http.post(url, formData)
    //         .subscribe((res: any) => {
    //             alert(res.url);
    //             if (res.code === 200) {
    //                 this.fileUrls.push(this.fileDomain + res.url);
    //                 this.fileUploadChange.next({
    //                     fileUrls: this.fileUrls,
    //                     errors: this.errors
    //                 });
    //             } else {
    //                 this.errors.push(res.message);
    //             }
    //         }, (error) => {
    //             if (error.error instanceof ErrorEvent) {
    //                 this.errors.push(error.error.message);
    //             } else {
    //                 this.errors.push(error.error);
    //             }
    //         });
    // }

    // dataURLtoFile(dataurl, filename) {
    //     const arr = dataurl.split(','),
    //         mime = arr[0].match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]);
    //     let n = bstr.length;
    //     const u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new File([u8arr], filename, { type: mime });
    // }
}
