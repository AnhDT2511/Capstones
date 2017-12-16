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
  selector: 'app-user-management',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.css']
})

export class UserManagementPageComponent implements OnInit {

  public data = [];
  public dataDetail = [];
  public filterQuery = '';

  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.dataService.get('/user/account/get-all').subscribe((response: any) => {
      this.data = response;
      // console.log(this.data);
      for (let i in this.data) {
        this.data[i]['details'] = {}
        this.dataService.get('/user/accountdetails/' + this.data[i].id).subscribe((response: any) => {
          this.dataDetail = response;
          this.data[i]['details'] = this.dataDetail;
          // console.log(this.data[i]['details']);
          //merger
        });
      }
    }, error => {

    });
  }

  deleteUser(id) {
    this.notificationService.printConfirmationDialog('Bạn có chắc chắn muốn xóa người dùng này!', () => {
      this.dataService.put('/user/account', {
        'id': id,
        'deleted': 0
      }).subscribe((response: any) => {
        // console.log('ok');
        this.getAllUser();
      });
    });
  }
}
