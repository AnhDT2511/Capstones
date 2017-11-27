import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { MessageContstants } from '../../../shared/common/message.constants';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management-page.component.html',
  styleUrls: ['./post-management-page.component.css']
})

export class PostManagementPageComponent implements OnInit {

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      title: {
        title: 'Title'
      },
      description: {
        title: 'Description'
      },
      postedby: {
        title: 'Posted By'
      },
      comment: {
        title: 'Commnet' //number of comment
      },
      like: {
        title: 'Like' // Number of like
      },
      share: {
        title: 'Share' // Number of share
      },
      report: {
        title: 'Repot'
      }
    }
  };

  

  data = [
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      postedby: "User 1",
      comment: "42",
      like: "150",
      share: "425",
      report: "15"
    },
    {
        id: 1,
        title: "Title 2",
        description: "Description 2",
        postedby: "User 2",
        comment: "42",
        like: "150",
        share: "425",
        report: "15"
    },
    {
        id: 1,
        title: "Title 3",
        description: "Description 3",
        postedby: "User 3",
        comment: "42",
        like: "150",
        share: "425",
        report: "15"
    }
  ];


  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }
}
