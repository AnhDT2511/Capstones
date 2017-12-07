import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/service/notification.service';
import { MessageContstants } from '../../shared/common/message.constants';
import { UrlConstants } from '../../shared/common/url.constants';
import { Router } from '@angular/router';
import { UtilityService } from '../../shared/service/utility.service';
import { SystemConstants } from '../../shared/common/system.constants';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post-page.component.html',
  styleUrls: ['./list-post-page.component.css']
})

export class ListPostPageComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  listTourPost = JSON.parse(localStorage.getItem("listTourPost"));
  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(
    private notificationService: NotificationService,
    private utilityservice : UtilityService,
    private router: Router) { }
  showDetail(_tourPost) {
    localStorage.removeItem("tourPost");
    localStorage.setItem("tourPost", JSON.stringify(_tourPost));
    this.utilityservice.navigate('/main/tourpost');
  }
  ngOnInit() {
    console.log(this.listTourPost);
  }
  logout() {
    window.localStorage.removeItem('CURRENT_USER');
    this.notificationService.printSuccessMessage('Đăng xuất thành công!');
    this.utilityservice.navigate(UrlConstants.HOME);
  }
}
