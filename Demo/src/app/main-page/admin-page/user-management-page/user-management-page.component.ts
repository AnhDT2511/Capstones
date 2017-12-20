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
      this.data = response.filter(item => item.roleId == 1);
      for (let i in this.data) {
        this.data[i]['details'] = {};
        this.data[i].deleted == 1 ? this.data[i]['checkBan'] = true : this.data[i]['checkBan'] = false;
        this.dataService.get('/user/accountdetail-by-accountID/' + this.data[i].id).subscribe((res: any) => {
          if (JSON.stringify(res) != "{}") {
            this.dataDetail = res;
            this.data[i]['details'] = this.dataDetail;
          }
        });
      }
    }, error => {

    });
  }

  deleteUser(item) {
    if (item.checkBan) {
      this.notificationService.printConfirmationDialog('Bạn có chắc chắn muốn cấp lại quyền truy cập cho người dùng này!', () => {
        let banUser = item;
        item.deleted = 0;
        this.dataService.put('/user/account', banUser).subscribe((response: any) => {
          // console.log('ok');
          this.getAllUser();
        });
      });
    } else {
      this.notificationService.printConfirmationDialog('Bạn có chắc chắn từ chối truy cấp đối với cho người dùng này!', () => {
        let banUser = item;
        item.deleted = 1;
        this.dataService.put('/user/account', banUser).subscribe((response: any) => {
          // console.log('ok');
          this.getAllUser();
        });
      });
    }
  }
}
