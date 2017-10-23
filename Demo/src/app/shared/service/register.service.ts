import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SystemConstants } from '../common/system.constants'

@Injectable()
export class RegisterService {
    
    constructor(private http: Http) { }

    register(model) {
        let registerUrl = SystemConstants.BASE_API + "/user/account";
        let headers1 = new Headers();
        headers1.append('Access-Control-Allow-Origin', '*');
        headers1.append('Content-Type', 'application/json');
        return this.http.post(registerUrl, JSON.stringify(model), { headers: headers1 });
        
    }

}
