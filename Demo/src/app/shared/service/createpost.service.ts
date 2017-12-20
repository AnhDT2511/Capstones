import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SystemConstants } from '../common/system.constants'

@Injectable()
export class CreatePostService {

    constructor(private http: Http) { }

    createPost(model) {
        // console.log(model);
        let createPostUrl = SystemConstants.BASE_API + '/tours/post/1/day/2/detail';
        let headers1 = new Headers();
        headers1.append('Access-Control-Allow-Origin', '*');
        headers1.append('Content-Type', 'application/json');
        return this.http.post(createPostUrl, JSON.stringify(model), { headers: headers1 });
    }

}