import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthenService, UtilityService, NotificationService } from '../../shared/index';
import { UrlConstants, SystemConstants } from '../../shared/common/index';

@Component({
  selector: 'app-admin-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit {


  constructor(
    private _authenService : AuthenService,
    private _utilityService : UtilityService,
    private _notifyService : NotificationService
  ) { }

  ngOnInit() {
    if(!this._authenService.hasPermission()){
      this._notifyService.printErrorMessage('Xin hãy đăng nhập tài khoản admin');
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._utilityService.navigateToLogin();
    }
  }
}
