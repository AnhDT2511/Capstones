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
  
  listUser: any;

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      username: {
        title: 'User Name'
      },
      name: {
        title: 'Full Name'
      },
      dob: {
        title: 'DOB'
      },
      Job: {
        title: 'Job'
      },
      gender: {
        title: 'Gender'
      },
      address: {
        title: 'Address'
      },
      phone: {
        title: 'Phone'
      },
      point: {
        title: 'Point'
      }
    }
  };

  model: any = {};
  returnUrl: string;

  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.dataService.get('/user/account/get-all').subscribe((response: any) => {
      this.listUser = response;
    }, error => {
    });
  }
}
