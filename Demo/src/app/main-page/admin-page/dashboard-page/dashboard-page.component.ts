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
  listTour: any;
  listComment: any;
  public numUsers;
  public numPosts;
  public numTours;

  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.getAllUser();
    this.getAllPost();
    this.getAllTour();
  }

  getAllUser() {
    this.dataService.get('/user/account/get-all').subscribe((response: any) => {
      this.listUser = response;
      this.numUsers = this.listUser.length;
    }, error => {
    });
  }

  getAllPost() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      this.listPost = response.filter(item => item.type == 0 && item.deleted == 0);;
      this.numPosts =  this.listPost.length;
    }, error => {
    });
  }

  getAllTour() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      this.listTour = response.filter(item => item.type == 1 && item.deleted == 0);;
      this.numTours =  this.listTour.length;
    }, error => {
    });
  }
  
  // getAllComment() {
  //   this.dataService.get('/tours/post/comment/get-all').subscribe((response: any) => {
  //     this.listComment = response;
  //     this.numComments = response.length;
  //   }, error => {
  //   });
  // }
}
