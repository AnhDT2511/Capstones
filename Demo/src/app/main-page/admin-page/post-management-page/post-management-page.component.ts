import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { MessageContstants } from '../../../shared/common/message.constants';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Router } from '@angular/router';
import { DataService } from './../../../shared/service/data.service';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management-page.component.html',
  styleUrls: ['./post-management-page.component.css']
})

export class PostManagementPageComponent implements OnInit {

  data = [];
  public filterQuery = '';

  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.getAllTourPost();
  }

  getAllTourPost() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      this.data = response;
      console.log(response);
    }, error => {
    });
  }
}
