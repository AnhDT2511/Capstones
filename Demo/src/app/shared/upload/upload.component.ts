import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { SystemConstants } from '../common/system.constants'
 
import $ from 'jquery/dist/jquery.min';
 
@Component({
  selector: 'app-uploader',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  uploadingText = 'Chọn file (chỉ chấp nhận file ảnh)';
  uploadResult: any = {
    progress: 0,
    uploadingText: this.uploadingText,
    fileUrl: null
  }
  constructor(private title: Title) { }
  ngOnInit() {
    this.title.setTitle("Angular 4 - Upload file"); 
  }
  doUploadFile() {
    this.uploadResult.progress = 0;
    this.uploadResult.fileUrl = null;
    this.uploadResult.uploadingText = this.uploadingText;
    $("#fileUploadInput").trigger("click");
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file);
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let json = JSON.parse(xhr.response);
            let fileUrl = SystemConstants.BASE_API + json.Name;
            this.uploadResult.progress = 100;
            this.uploadResult.fileUrl = fileUrl;
            this.uploadResult.uploadingText = "Hoàn thành";
 
          } else {
            console.log(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        this.uploadResult.uploadingText = "Đang tải ảnh lên...";
        let percentVal = Math.round(event.loaded / event.total * 100);
        this.uploadResult.progress = percentVal;
      };
      xhr.open('POST', '/assets/img', true);
      xhr.send(formData);
    }
  }
}