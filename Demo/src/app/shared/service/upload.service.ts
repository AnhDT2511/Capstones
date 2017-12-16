import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SystemConstants } from '../common/index';

@Injectable()
export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File, user: any, tourByDayID: any): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file, user + "_" + Date.now() + "_" + tourByDayID + '_' + file.name);

    const req = new HttpRequest('POST', SystemConstants.BASE_API + '/image', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  // getFiles(): Observable<string[]> {
  //   // return this.http.get('/getallfiles')
  // }
}