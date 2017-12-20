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
      this.data = response.filter(item => item.deleted == 0 && item.type == 0);
      // console.log(this.data);
      for (let i in this.data) {
        this.data[i]['details'] = {}
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

  deletePost(id) {
    this.notificationService.printConfirmationDialog('Bạn có chắc chắn muốn xóa bài viết này!', () => {
      this.dataService.put('/tours/post/', {
        'id': id,
        'deleted': 1
      }).subscribe((response: any) => {
        // console.log('ok delete post');
        this.getAllPost();
      });
    });
  }

}
