import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/service/notification.service';
import { MessageContstants } from '../shared/common/message.constants';
import { UrlConstants } from '../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.css']
})

export class ForgetPasswordComponent implements OnInit {
  loading = false;
  model: any = {
    photoId: "../../assets/img/default-user-image.png",   //defaut
    credit: 78,                                            //defaut
    point: 55,                                             //defaut
    deleted: 1,                                           //defaut
    roleId: 2                                             //defaut
  };
  
  constructor(
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

}
