import { DataService } from './../../../shared/service/data.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { MessageContstants } from '../../../shared/common/message.constants';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})

export class DashboardPageComponent implements OnInit {

  listUser: any;
  listPost: any;
  listComment: any;
  public numUsers;
  public numPosts;
  public numComments;

  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.getAllUser();
    this.getAllPost();
    this.getAllComment();
  }

  getAllUser() {
    this.dataService.get('/user/account/get-all').subscribe((response: any) => {
      this.listUser = response;
      this.numUsers = response.length;
    }, error => {
    });
  }

  getAllPost() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      this.listPost = response;
      this.numPosts = response.length;
    }, error => {
    });
  }

  getAllComment() {
    this.dataService.get('/tours/post/comment/get-all').subscribe((response: any) => {
      this.listComment = response;
      this.numComments = response.length;
    }, error => {
    });
  }
}
