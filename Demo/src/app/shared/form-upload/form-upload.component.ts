import { Component, OnInit, Output, EventEmitter ,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType, HttpDownloadProgressEvent } from '@angular/common/http';
import { UploadFileService } from '../../shared//service/upload.service';
import { NotificationService, AuthenService } from '../index';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
  @Output() listImage: EventEmitter<String> = new EventEmitter<String>();
  @Output() result: EventEmitter<String> = new EventEmitter<String>();
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  user: any = this.authentication.getLoggedInUser();
  listFileName: any = [];

  constructor(
    private uploadService: UploadFileService,
    private notifyService: NotificationService,
    private authentication: AuthenService
  ) {

  }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.listImage.emit(event.target.files);
  }

  upload(listData) {
    this.progress.percentage = 0;
    for (let i = 0; i < listData.length; i++) {
      this.currentFileUpload = listData[i];
      this.uploadService.pushFileToStorage(this.currentFileUpload, this.user.id).subscribe(event => {
        if (event.type === 3) {
          this.result.emit(event['partialText']);
        }
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.notifyService.printSuccessMessage('Upload File thành công');
        }
      })
    }
    this.selectedFiles = undefined;
  }
}