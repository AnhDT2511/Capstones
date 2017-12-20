import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { MessageContstants } from '../../../shared/common/message.constants';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Router } from '@angular/router';
import { DataService } from './../../../shared/service/data.service';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management-page.component.html',
  styleUrls: ['./post-management-page.component.css']
})

export class PostManagementPageComponent implements OnInit {

  public data = [];
  public dataDetail = [];
  public filterQuery = '';

  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.getAllPost();
  }

  getAllPost() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      this.data = response.filter(item => item.type == 0);
      // console.log(this.data);
      for (let i in this.data) {
        this.data[i]['details'] = {}
        this.data[i].deleted == 1 ? this.data[i]['checkBan'] = true : this.data[i]['checkBan'] = false;
        this.dataService.get('/user/accountdetail-by-accountID/' + this.data[i].accountID).subscribe((response: any) => {
          this.dataDetail = response;
          this.data[i]['details'] = this.dataDetail;
          // console.log(this.data[i]['details']);
          //merger
        });
      }
    }, error => {
    });
  }

  deletePost(item) {
    if (item.checkBan) {
      this.notificationService.printConfirmationDialog('Bạn có chắc chắn muốn cấp lại quyền truy cập cho bài viết này!', () => {
        let banUser = item;
        item.deleted = 0;
        this.dataService.put('/tours/post/', banUser).subscribe((response: any) => {
          // console.log('ok');
          this.getAllPost();
        });
      });
    } else {
      this.notificationService.printConfirmationDialog('Bạn có chắc chắn ẩn bài viết này!', () => {
        let banUser = item;
        item.deleted = 1;
        this.dataService.put('/tours/post/', banUser).subscribe((response: any) => {
          // console.log('ok');
          this.getAllPost();
        });
      });
    }
  }

}
