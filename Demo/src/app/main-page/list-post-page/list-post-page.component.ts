import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/service/notification.service';
import { MessageContstants } from '../../shared/common/message.constants';
import { UrlConstants } from '../../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post-page.component.html',
  styleUrls: ['./list-post-page.component.css']
})

export class ListPostPageComponent implements OnInit {

  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

}
