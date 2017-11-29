import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/service/notification.service';
import { MessageContstants } from '../../shared/common/message.constants';
import { UrlConstants } from '../../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent implements OnInit {
  
  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

}
