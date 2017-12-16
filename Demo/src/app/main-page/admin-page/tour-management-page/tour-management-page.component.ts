import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { MessageContstants } from '../../../shared/common/message.constants';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Router } from '@angular/router';
import { DataService } from './../../../shared/service/data.service';

@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-management-page.component.html',
  styleUrls: ['./tour-management-page.component.css']
})

export class TourManagementPageComponent implements OnInit {

  data = [];
  public filterQuery = '';

  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.getAllTour();
  }

  getAllTour() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      this.data = response.filter(item => item.type == 1 && item.deleted == 0);
      console.log(this.data);
    }, error => {
    });
  }
}