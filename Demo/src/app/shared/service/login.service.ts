import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class LoginService {
  token: string = "123";
  url : string = "https://tripnetapi.herokuapp.com";

  constructor (private http: Http) {}

  sendCredential(model) {
    let tokenUrl1 = this.url + "/user/account/login";
    let headers1 = new Headers();
    headers1.append('Access-Control-Allow-Origin','*');
    headers1.append('Content-Type','application/json');
    return this.http.post(tokenUrl1, JSON.stringify(model), {headers: headers1});
  }

//   sendToken(token) {
//     let tokenUrl2 = "http://localhost:8080/rest/user/users";
//     console.log('Bearer '+token);

//     let getHeaders = new Headers({'Authorization':'Bearer '+token});

//     return this.http.get(tokenUrl2, {headers: getHeaders})
//   }

  logout() {
    localStorage.setItem("token","");
    localStorage.setItem("currentUserName", '');
    alert("You just logged out.");
  }

  checkLogin() {
    if (localStorage.getItem("currentUserName")!=null && localStorage.getItem("currentUserName")!='' && localStorage.getItem("token")!=null && localStorage.getItem("token")!='') {
      
      return true;
    } else {
      return false;
    }
  }

}
