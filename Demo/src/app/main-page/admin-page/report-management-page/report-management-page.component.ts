import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { MessageContstants } from '../../../shared/common/message.constants';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Router } from '@angular/router';
import { DataService } from './../../../shared/service/data.service';
import * as _ from "lodash";
import { CommonService } from '../../../shared/index';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management-page.component.html',
  styleUrls: ['./report-management-page.component.css']
})

export class ReportManagementPageComponent implements OnInit {

  public data = [];
  public dataDetail = [];
  public filterQuery = '';

  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getAllReport();
  }
  
  getAllReport() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      this.data = response;
      console.log(this.data);
      for (let i in this.data) {
        this.data[i]['details'] = {}
        this.dataService.get('/tours/post/get-all-report-of-post/' + this.data[i].id).subscribe((response: any) => {
          this.dataDetail = response;
          this.data[i]['details'] = this.dataDetail;
          console.log(this.data[i]['details']);
        });
      }
    }, error => {

    });

  }

  acceptReport(id) {
    this.dataService.put('/user/account', {
      'id': id,
      'deleted': 0
    }).subscribe((response: any) => {
      console.log('ok');
      this.getAllReport();
    });
  }

}
