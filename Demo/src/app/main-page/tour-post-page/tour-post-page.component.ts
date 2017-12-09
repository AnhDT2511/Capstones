import { Component, OnInit, Renderer2 } from '@angular/core';
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
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { concat } from 'rxjs/observable/concat';

@Component({
  selector: 'app-tour-post-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tour-post-page.component.html',
  styleUrls: ['./tour-post-page.component.css']
})

export class TourPostPageComponent implements OnInit, OnDestroy {

  user: any = this.authentication.getLoggedInUser();
  tourPostId: string;
  tourPost: any = { 'liked': false, 'likedID': 0 };
  tourByDay: any;
  tourByDayDetail: any = [];
  statusComment: boolean = true;
  statusReport: boolean = true;
  hideForm: boolean = true;
  comment: string = "";
  report: any;
  randomIndex: any;
  bookMarked: any = false;
  liked: any = false;
  listLikeObj: any;
  listCheckbox: any = {};
  reported: any = false;
  listPlace: any = ['Ha Noi',
    'Da Nang',
    'Sai Gon',
    'Quang Ninh',
    'Hai Phong',
    'Bac Lieu',
    'Nha Trang'];
  textArray = [
    'red',
    'blue',
    'purple',
    'green',
  ];
  options = [
    { name: 'Nội dung phản động', value: '1' },
    { name: 'Nội dung sai, không đúng sự thật', value: '2' },
    { name: 'Nội dung không đúng thuần phong - mỹ tục', value: '3' },
    { name: 'Nội dung sao chép từ nguồn khác', value: '4' },
    { name: 'Không đúng thuần phong - mỹ tục', value: '5' },
  ]
  listComment: any;

  public tourpostId: number;

  constructor(
    private utilityService: UtilityService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private renderer: Renderer2
  ) {
    // let localData = JSON.parse(localStorage.getItem('tourPost'));
    this.activatedRoute.params.subscribe((params: Params) => {
      this.tourPostId = params.id;
      this.dataService.get('/tours/post/' + params.id).subscribe((response: any) => {
        this.tourPost = response;
        this.tourPost.postViewNumber += 1;
        //tằng lượt xem
        this.commonService.updatePost(this.tourPost, data => {
        });
        this.dataService.get('/tours/post/' + response.id + '/like/get-all').subscribe((response: any) => {
          if (response != null) {
            if (this.user && response.findIndex(item => item.likeByID === this.user.id && item.deleted == 0) != -1) {
              this.tourPost.liked = true;
              this.tourPost.likedID = response[response.findIndex(item => item.likeByID === this.user.id)].id;
            } else if (this.user && response.findIndex(item => item.likeByID === this.user.id && item.deleted == 1) != -1) {
              this.tourPost.liked = true;
              this.tourPost.likedID = 0
            } else {
              this.tourPost.liked = false;
            }
          }
        }, error => {
        });
        this.commonService.getTourByDayDetails(response.id, data => {
          for (let i in data) {
            this.tourByDayDetail.push(data[i]);
          }
        });
        this.commonService.getAccountDetailsInfo(this.tourPost.accountID, data => {
          this.tourPost['author'] = data.firstName + ' ' + data.lastName;
        });

        this.commonService.getAccountInfo(this.tourPost.accountID, data => {
          this.tourPost['authorID'] = data.id;
          this.tourPost['level'] = data.level;
        });
        this.commonService.getBookMarkByAccountID(this.user.id, data => {
          if (data.findIndex(item => item.tourPostID == this.tourPost.id && item.deleted == 0) != -1) {
            this.bookMarked = true;
          }
        })
        this.commonService.getLikeByTourPostID(this.user.id, data => {
          this.tourPost['countLike'] = data.filter(item => item.deleted == 0).length;
          if (data.findIndex(item => item.likeByID == this.user.id && item.deleted == 0) != -1) {
            this.liked = true;
          }
          this.listLikeObj = data;
        })
        this.commonService.getReportByAccountID(this.user.id, data => {
          if (data.findIndex(item => item.tourPostID == this.tourPost.id && item.deleted == 0) != -1) {
            this.reported = true;
          }
        })
        this.commonService.getNumberReport(this.tourPost.id, data => {
          typeof(data) == "object" ? this.tourPost['countReport'] = 0 : this.tourPost['countReport'] = data;
        })
        this.commonService.getNumberComment(this.tourPost.id, data => {
          typeof(data) == "object" ? this.tourPost['countComment'] = 0 : this.tourPost['countComment'] = data;
        })
      }, error => {
      });
    });

  }

  ngOnInit() {
    this.randomIndex = Math.floor(Math.random() * this.textArray.length);
    this.renderer.addClass(document.body, 'body-' + this.textArray[this.randomIndex]);
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'body-' + this.textArray[this.randomIndex]);
  }
  nagivateProfile() {
    this.utilityService.navigate(UrlConstants.PROFILE);
  }
  showPersonalInfo() {
    this.utilityService.navigate('/main/profile/' + this.tourPost.authorID);
  }
  submitReport() {
    this.commonService.addReport({
      'tourPostID': this.tourPost.id,
      'reportedBy': this.user.id,
      'description': 'other' in this.listCheckbox ? this.listCheckbox.other : '',
      'deleted': 0,
      'createTime': Date.now(),
      'reasonReport': this.getKeyByValue(this.listCheckbox, true)
    }, data => {
      'countReport' in this.tourPost ? this.tourPost.countReport++ : this.tourPost['countReport'] = 1;
      this.openCloseReport();
      this.reported = true;
      this.notifyService.printSuccessMessage('Báo cáo thành công');
    })
  }

  getKeyByValue(object, value) {
    let stringVehicle = "";
    Object.keys(object).filter(key => object[key] === value).forEach(element => {
      if (element != undefined) {
        stringVehicle += element + ",";
      }
    });
    return stringVehicle.substring(0, stringVehicle.length - 1);;
  }

  bookMark(tourPost: any) {
    let bookMarkObj;
    this.commonService.getBookMarkByAccountID(this.user.id, data => {
      bookMarkObj = data[data.findIndex(item => item.tourPostID == tourPost.id)];
      if (this.user != null && bookMarkObj == undefined) {
        let _bookmark = {
          'tourPostID': tourPost.id,
          'markingByID': this.user.id,
          'deleted': 0,
          'createTime': Date.now()
        };
        this.commonService.addBookMark(_bookmark, data => {
          this.bookMarked = true;
        })
        this.notifyService.printSuccessMessage('Lưu bài viết thành công!');
      } else if (this.user != null && bookMarkObj != undefined) {
        let _bookmark = {
          'id': bookMarkObj['id'],
          'deleted': 0,
          'updateTime': Date.now()
        };
        if (bookMarkObj['deleted'] == 0) {
          _bookmark.deleted = 1;
          this.notifyService.printSuccessMessage('Bỏ lưu bài viết thành công!');
          this.bookMarked = false;
        } else {
          this.notifyService.printSuccessMessage('Lưu bài viết thành công!');
          this.bookMarked = true;
        }
        this.commonService.updateBookMark(_bookmark, data => {
        })

      } else {
        this.notifyService.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
      }
    })
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
    if (this.reported) {
      this.notifyService.printErrorMessage('Báo cáo của bạn đã được ghi nhận, xin cảm ơn !');
    } else {
      this.statusReport = !this.statusReport;
    }
  }

  likeTourPost() {
    let existLike = this.listLikeObj.find(item => item.likeByID == this.user.id);
    if (this.user != null && existLike == undefined) {
      let _like = new Like(null, this.tourPost.id, this.user.id, 0);
      this.dataService.post('/tours/post/' + this.tourPost.id + '/Like', _like).subscribe((response: any) => {
        this.tourPost.liked = true;
        this.tourPost.countLike++;
      }, error => {
      });
      this.notifyService.printSuccessMessage('Thích bài viết thành công!');
    } else if (this.user != null && existLike != undefined) {
      let _relike = new Like(existLike.id, this.tourPost.id, this.user.id, 0);
      if (existLike.deleted == 0) {
        _relike.deleted = 1;
        existLike.deleted = 1;
        this.notifyService.printSuccessMessage('Bỏ thích bài viết thành công!');
        this.liked = false;
        this.tourPost.countLike--;
      } else {
        existLike.deleted = 0;
        this.notifyService.printSuccessMessage('Thích bài viết thành công!');
        this.liked = true;
        this.tourPost.countLike++;
      }
      this.dataService.put('/tours/post/' + this.tourPost.id + '/Like', _relike).subscribe((response: any) => {
      }, error => {
      });
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
