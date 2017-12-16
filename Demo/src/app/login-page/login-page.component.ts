import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/service/notification.service';
import { AuthenService } from '../shared/service/authen.service';
import { MessageContstants } from '../shared/common/message.constants';
import { UrlConstants } from '../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginComponent implements OnInit {
  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authenService.login(this.model).subscribe(data => {
      console.log(data);
      if (data !== null) {
        this.notificationService.printSuccessMessage(MessageContstants.LOGIN_SUCCESS);
        this.router.navigate([UrlConstants.HOME]);
        // console.log(window.localStorage);
      } else {
        this.notificationService.printErrorMessage(MessageContstants.INFO_LOGIN_WRONG);
        this.loading = false;
      }
    }, error => {
      this.notificationService.printErrorMessage(MessageContstants.INFO_LOGIN_WRONG);
      this.loading = false;
    });
  }

}
