import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../common/system.constants';
import { LoggedInUser } from '../domain/loggedin.user';
import 'rxjs/add/operator/map';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { UrlConstants } from '../common/url.constants';
import { MessageContstants } from '../common/message.constants';

@Injectable()
export class AuthenService {

  constructor(private _http: Http,
    private notifyService: NotificationService,
    private router: Router) { }

  login(model) {
    let headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    headers.append("Content-Type", "application/json");
    headers.delete("Authorization");
    headers.append("Authorization", 'Basic ' + btoa(model.email + ':' + model.password));
    let options = new RequestOptions({ headers: headers });

    // console.log(options);
    // console.log(model);
    return this._http.post(SystemConstants.BASE_API + '/user/account/login', model, options).map((response: Response) => {
      let _body = JSON.parse(JSON.parse(JSON.stringify(response))._body)[0];
      let user: LoggedInUser = _body;
      if (user && _body.deleted == 0) {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
        if (user.roleId != 0) {
          this.router.navigate([UrlConstants.HOME]);
        } else {
          this.router.navigate([UrlConstants.ADMIN]);
        }
        this.notifyService.printSuccessMessage(MessageContstants.LOGIN_SUCCESS);
      } else if (_body.deleted == 1) {
        this.notifyService.printErrorMessage('T�i kho?n c?a b?n kh�ng h?p l? ho?c d� b? kh�a');
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
        userData.roleId,
        userData.password,
        userData.createTime,
        userData.deleted
      )
    }
    else
      user = null;
    return user;
  }

  hasPermission(): boolean {
    var user = this.getLoggedInUser();
    var result: boolean = false;
    var roles: any = user.roleId;
    if (roles == 1) {
      // this.notifyService.printErrorMessage('B?n ph?i c� quy?n admin !');
      // this.utilityService.navigateToLogin;
      return false;
    }
    return true
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
