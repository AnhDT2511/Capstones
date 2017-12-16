import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/service/notification.service';
import { RegisterService } from '../shared/service/register.service';
import { MessageContstants } from '../shared/common/message.constants';
import { UrlConstants } from '../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterComponent implements OnInit {
  loading = false;
  model: any = {
    // photoId: "default-user-image.png",   //defaut
    // credit: 0,                                            //defaut
    // point: 0,
    createdTime : Date.now(),                                             //defaut
    deleted: 0,                                           //defaut
    roleId: 1                                             //defaut
  };
  constructor(
    private registerService: RegisterService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    console.log(this.model);
    this.registerService.register(this.model).subscribe(data => {
      if (data !== null) {
        this.notificationService.printSuccessMessage(MessageContstants.REGISTER_SUCCESS);
        this.router.navigate([UrlConstants.HOME]);
        //console.log(data);
      } else {
        this.notificationService.printErrorMessage(MessageContstants.REGISTER_FAILED);
        this.loading = false;
      }
    }, error => {
      this.notificationService.printErrorMessage(MessageContstants.REGISTER_FAILED);
      this.loading = false;
    });
  }
}
