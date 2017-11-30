
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UtilityService } from '../../shared/service/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { DataService } from '../../shared/service/data.service';
import { CommonService } from '../../shared/service/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { debug } from 'util';
import { TourPost } from '../../shared/domain/tourPost.user';
import { Like } from '../../shared/domain/like.user';
import { Comment } from '../../shared/domain/comment.user';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-tour-post-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tour-post-page.component.html',
  styleUrls: ['./tour-post-page.component.css']
})

export class TourPostPageComponent implements OnInit {
  user: any = this.authentication.getLoggedInUser();
  // userDetails : any = {};
  tourPostId: string;
  tourPost: any;
  tourByDay: any;
  tourByDayDetail: any = [];
  statusComment: boolean = true;
  statusReport: boolean = true;
  hideForm: boolean = true;
  comment: string = "";
  listPlace: any = ['Ha Noi',
    'Da Nang',
    'Sai Gon',
    'Quang Ninh',
    'Hai Phong',
    'Bac Lieu',
    'Nha Trang'];
  listComment: any;

  public tourpostId: number;

  constructor(
    private utilityService: UtilityService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.tourPostId = params.id;
    //   this.dataService.get('/tourpost/' + params.id).subscribe((response: any) => {
    //     // console.log(response);
    //     this.tourPost = response;
    //   }, error => {
    //   });
    // });

    this.tourPost = JSON.parse(localStorage.getItem('tourPost'));
    // this.commonService.getTourByDay(this.tourPost.id, data => {
    //   this.tourByDay = data[0];
    // });

    this.commonService.getTourByDayDetails(this.tourPost.id, data => {
      for (let i in data) {
          this.tourByDayDetail.push(data[i]);
      }
    });

    this.commonService.getAccountDetailsInfo(this.tourPost.accountID, data => {
      this.tourPost['author'] = data.firstName + ' ' + data.lastName;
    });

    this.commonService.getAccountInfo(this.tourPost.accountID, data => {
      this.tourPost['level'] = data.level;
    });
    // console.log(this.tourByDayDetail);
    console.log(this.tourPost);
  }

  nagivateProfile() {
    this.utilityService.navigate(UrlConstants.PROFILE);
  }

  sendComment() {
    if (this.user != null) {
      let _comment = new Comment(this.comment, this.tourPost.id, this.user.id);
      this.dataService.post('/tours/post/' + this.tourPost.id + '/comment', _comment).subscribe((response: any) => {
        this.loadComment();
      }, error => {
      });
    } else {
      this.notifyService.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  loadComment() {
    this.dataService.get('/tours/post/' + this.tourPost.id + '/comment/get-all').subscribe((response: any) => {
      this.listComment = response;
      for (var i in this.listComment) {
        this.dataService.get('/user/account/' + this.listComment[i].commentByID).subscribe((response: any) => {
          for (var i in this.listComment) {
            if (this.listComment[i].commentByID == response.id) {
              this.listComment[i]['userName'] = response.userName;
            }
          }
          // this.listComment[this.listComment.findIndex(item => item.commentByID === response.id)]["userName"] = response.userName;
        }, error => {
        });
      }
    }, error => {
    });
  }

  openCloseCmt() {
    this.loadComment();
    this.statusComment = !this.statusComment;
  }

  openCloseReport() {
    this.statusReport = !this.statusReport;
  }

  likeTourPost(tourPost: any) {
    if (this.user != null && !tourPost.liked) {
      let _like = new Like(null, tourPost.id, this.user.id, 0);
      this.dataService.post('/tours/post/' + tourPost.id + '/Like', _like).subscribe((response: any) => {
        this.tourPost.liked = true;
        this.tourPost.countLike++;
        localStorage.removeItem('tourPost');
        localStorage.setItem('tourPost', JSON.stringify(this.tourPost));
      }, error => {
      });
      this.notifyService.printSuccessMessage('Thích bài viết thành công!');
    } else if (this.user != null && tourPost.liked) {
      // let _dislike = new Like(tourPost.likedID, tourPost.id, this.user.id, 1);
      // console.log(_dislike);
      // this.commonService.disLike(tourPost.id, _dislike, data => {
      //   console.log(data);
      // });
      let _dislike = new Like(tourPost.likedID, tourPost.id, this.user.id, 1);
      console.log(_dislike);
      this.dataService.post('/tours/post/' + tourPost.id + '/Like', _dislike).subscribe((response: any) => {
        this.tourPost.liked = false;
        this.tourPost.countLike--;
        console.log(this.tourPost.countLike);
        localStorage.removeItem('tourPost');
        localStorage.setItem('tourPost', JSON.stringify(this.tourPost));
      }, error => {
      });

      this.notifyService.printSuccessMessage('Bỏ thích bài viết thành công!');
    } else {
      this.notifyService.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  logout() {
    window.localStorage.removeItem('CURRENT_USER');
    this.user = this.authentication.getLoggedInUser();
    this.notifyService.printSuccessMessage('Đăng xuất thành công!');
    // this.notifyService.printConfirmationDialog("Bạn có chắc chắn muốn đăng xuất?" , this.resetLogin)
  }


}
