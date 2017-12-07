import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { MessageContstants } from '../../../shared/common/message.constants';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Router } from '@angular/router';
import { DataService } from './../../../shared/service/data.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.css']
})

export class UserManagementPageComponent implements OnInit {

  data = [];
  public filterQuery = '';

  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.dataService.get('/user/account/get-all').subscribe((response: any) => {
      this.data = response;
      console.log(response);
    }, error => {
    });
  }
  
}
