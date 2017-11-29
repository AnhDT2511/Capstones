import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SystemConstants } from '../common/system.constants';
import { DataService } from './data.service'

@Injectable()
export class CommonService {

    account: any;
    constructor(
        private http: Http,
        private dataService: DataService
    ) { }

    getAccountInfo(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/user/account/' + id).subscribe(
            res => {
                callback(res);
            },
            err => {
                console.error(err);
            }
        );
    }

    getAccountDetailsInfo(id, callback: (data) => void) {
        return this.dataService.get('/user/accountdetails/' + id).subscribe(
            res => {
                callback(res);
            },
            err => {
                console.error(err);
            }
        );
    }

    getTourByDayDetails(id, callback: (data) => void) {
        return this.dataService.get('/tours/post/' + id + '/day/1/detail/get-all').subscribe(res => {
            callback(res);
        });
    }

    getTourByDay(id, callback: (data) => void) {
        this.dataService.get('/tours/post/' + id + '/get-all').subscribe(res => {
            callback(res);
        });
    }

    disLike(id, _dislike,  callback: (data) => void) {
        this.dataService.put('/tours/post/' + id + '/Like', _dislike).subscribe(res => {
            callback(res);
        }, error => {
        });
    }
}