import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { MessageContstants } from '../../../shared/common/message.constants';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.css']
})

export class UserManagementPageComponent implements OnInit {

  data = [
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 2,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 11,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz",
      gender: "Male",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },

    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },

    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },
    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    },

    {
      id: 1,
      photo: "http://demo.neontheme.com/assets/images/thumb-1@2x.png",
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      gender: "Female",
      address: "Hanoi",
      phone: "059225626",
      point: "155"
    }
  ];

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      photo: {
        title: ''
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
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

  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }
}
