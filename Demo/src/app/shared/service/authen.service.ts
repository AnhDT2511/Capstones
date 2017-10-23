import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../common/system.constants';
import { LoggedInUser } from '../domain/loggedin.user';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }

  login(model) {
    // let body = "email=" + encodeURIComponent(email) +
    //   "&password=" + encodeURIComponent(password) +
    //   "&grant_type=password";
    let headers = new Headers();
    // headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });

    return this._http.post(SystemConstants.BASE_API + '/user/account/login', model, options).map((response: Response) => {
      let _body = JSON.parse(JSON.parse(JSON.stringify(response))._body)[0];
      delete _body["password"];
      delete _body["createTime"];
      delete _body["deleted"];
      let user: LoggedInUser = _body;
      if (user) {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
      }
    });
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    }
    else
      return false;
  }

  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUser(
        userData.id,
        userData.userName,
        userData.email,
        userData.photoId,
        userData.credit,
        userData.point,
        userData.roleId);
    }
    else
      user = null;
    return user;
  }
  // checkAccess(functionId: string) {
  //   var user = this.getLoggedInUser();
  //   var result: boolean = false;
  //   var permission: any[] = JSON.parse(user.permissions);
  //   var roles: any[] = JSON.parse(user.roles);
  //   var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanRead == true);
  //   if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1) {
  //     return true;
  //   }
  //   else
  //     return false;
  // }
  // hasPermission(functionId: string, action: string): boolean {
  //   var user = this.getLoggedInUser();
  //   var result: boolean = false;
  //   var permission: any[] = JSON.parse(user.permissions);
  //   var roles: any[] = JSON.parse(user.roles);
  //   switch (action) {
  //     case 'create':
  //       var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanCreate == true);
  //       if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
  //         result = true;
  //       break;
  //     case 'update':
  //       var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanUpdate == true);
  //       if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
  //         result = true;
  //       break;
  //     case 'delete':
  //       var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanDelete == true);
  //       if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
  //         result = true;
  //       break;
  //   }
  //   return result;
  // }
}
