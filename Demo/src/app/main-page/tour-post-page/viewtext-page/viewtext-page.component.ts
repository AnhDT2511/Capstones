import { Component, OnInit, Renderer2, AfterViewChecked, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { debug } from 'util';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { concat } from 'rxjs/observable/concat';
import { SystemConstants } from '../../../shared/common/system.constants';
import { InfoContstants } from '../../../shared/common/info.constants';
import { UtilityService, NotificationService, AuthenService, DataService, CommonService } from '../../../shared/index';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Comment } from '../../../shared/domain/comment.user';
import { Like } from '../../../shared/domain/like.user';

@Component({
  selector: 'app-viewtext-page',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './viewtext-page.component.html',
  styleUrls: ['./viewtext-page.component.css']
})

export class ViewTextPageComponent implements OnInit, OnDestroy {

  user: any = this.authentication.getLoggedInUser();
  checkLogin: any = false;
  tourPostId: string;
  tourPost: any = {};
  tourByDay: any;
  tourByDayDetail: any = [];
  statusComment: boolean = true;
  statusReport: boolean = true;
  baseFolder: String = SystemConstants.BASE_IMAGE;
  comment: string = "";
  report: any;
  randomIndex: any;
  bookMarked: any = false;
  liked: any = false;
  listCheckbox: any = {};
  reported: any = false;
  hideForm: boolean = false;
  listPlace: any = InfoContstants.CITY_VN;
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
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    if (!InfoContstants.isEmpty(this.user)) {
      this.checkLogin = true;
    }
    this.activatedRoute.params.subscribe((params: Params) => {
      this.tourPostId = params.id;
      this.dataService.get('/tours/post/' + params.id).subscribe((response: any) => {
        this.tourPost = response;
        this.tourPost.postViewNumber += 1;
        //tằng lượt xem
        this.commonService.updatePost(this.tourPost, data => {
        });
        this.commonService.getTourByDayDetails(response.id, data => {
          for (let i in data) {
            let objectVehicle = {};
            let item = data[i];
            let arrayVehicle = item.vehicle.split(',');
            arrayVehicle.forEach(element => {
              switch (Number(element)) {
                case 1:
                  objectVehicle['motorcycle'] = true;
                  break;
                case 2:
                  objectVehicle['taxi'] = true;
                  break;
                case 3:
                  objectVehicle['bus'] = true;
                  break;
              }
            });
            item.vehicle = objectVehicle;
            (item.placeID != undefined && item.placeID != 0) ? item.placeID = this.listPlace.find(it => it.id == item.placeID).title : null;
            this.commonService.getImageByTourByDayID(item.id, data => {
              let listImage = [];
              item['listImage'] = [];
              data.filter(item => item.deleted == 0).forEach(element => {
                listImage.push(element.name);
              });
              item['listImage'] = listImage;
            })
            setTimeout(() => {
              this.tourByDayDetail.push(item);
            }, 300)
          }
        });
        this.commonService.getAccountDetailsInfo(this.tourPost.accountID, data => {
          this.tourPost['author'] = data.firstName + ' ' + data.lastName;
        });

        this.commonService.getImageByAccountID(this.tourPost.accountID, i => {
          let image = i.find(item => item.deleted == 0 && item.tourPostID == 0 && item.tourByDayID == 0);
          this.tourPost['imageAuthor'] = image == undefined ? 'user.png' : image.name;
        })

        this.commonService.getAccountInfo(this.tourPost.accountID, data => {
          this.tourPost['authorID'] = data.id;
          this.tourPost['level'] = data.level;
        });

        if (this.checkLogin) {
          this.commonService.getBookMarkByAccountID(this.user.id, data => {
            if (data.findIndex(item => item.tourPostID == this.tourPost.id && item.deleted == 0) != -1) {
              this.bookMarked = true;
            }
          })
          this.commonService.getLikeByTourPostID(this.tourPostId, data => {
            this.tourPost['countLike'] = data.filter(item => item.deleted == 0).length;
            if (data.findIndex(item => item.likeByID == this.user.id && item.deleted == 0) != -1) {
              this.liked = true;
            }
          })
          this.commonService.getReportByAccountID(this.user.id, data => {
            if (data.findIndex(item => item.tourPostID == this.tourPost.id && item.deleted == 0) != -1) {
              this.reported = true;
            }
          })
        }
        this.commonService.getNumberReport(this.tourPost.id, data => {
          typeof (data) == "object" ? this.tourPost['countReport'] = 0 : this.tourPost['countReport'] = data;
        })
        this.commonService.getNumberComment(this.tourPost.id, data => {
          typeof (data) == "object" ? this.tourPost['countComment'] = 0 : this.tourPost['countComment'] = data;
        })
      }, error => {
      });
    });
  }

  bookMark(tourPost: any) {
    if (this.checkLogin) {
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
            this.notifyService.printErrorMessage('Bỏ lưu bài viết thành công!');
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
    } else {
      this.notifyService.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  likeTourPost() {
    if (this.checkLogin) {
      this.commonService.getLikeByTourPostID(this.tourPostId, data => {
        let existLike = data.find(item => item.likeByID == this.user.id)
        if (existLike == undefined) {
          let _like = new Like(null, this.tourPost.id, this.user.id, 0);
          this.dataService.post('/tours/post/' + this.tourPost.id + '/Like', _like).subscribe((response: any) => {
            this.liked = true;
            this.tourPost.countLike++;
          }, error => {
          });
          this.notifyService.printSuccessMessage('Thích bài viết thành công!');
        } else if (existLike != undefined) {
          let _relike = new Like(existLike.id, this.tourPost.id, this.user.id, 0);
          if (existLike.deleted == 0) {
            _relike.deleted = 1;
            this.notifyService.printErrorMessage('Bỏ thích bài viết thành công!');
            this.liked = false;
            this.tourPost.countLike--;
          } else {
            this.notifyService.printSuccessMessage('Thích bài viết thành công!');
            this.liked = true;
            this.tourPost.countLike++;
          }
          this.dataService.put('/tours/post/' + this.tourPost.id + '/Like', _relike).subscribe((response: any) => {
          }, error => {
          });
        }
      })
    } else {
      this.notifyService.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'body-white');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'body-white');
  }
  nagivateProfile() {
    this.utilityService.navigate(UrlConstants.PROFILE);
  }
  showPersonalInfo() {
    this.utilityService.navigate('/main/profile/' + this.tourPost.authorID);
  }
  sendComment() {
    if (this.checkLogin && !InfoContstants.isEmpty(this.comment)) {
      let _comment = new Comment(this.comment, this.tourPost.id, this.user.id);
      this.dataService.post('/tours/post/' + this.tourPost.id + '/comment', _comment).subscribe((response: any) => {
        this.loadComment();
        this.comment = "";
      }, error => {
      });
    } else if (this.checkLogin && InfoContstants.isEmpty(this.comment)) {
      this.notifyService.printErrorMessage('Bình luận không nên để trống');
    } else {
      this.notifyService.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  submitReport() {
    for (let i in this.listCheckbox) {
      let value = this.listCheckbox["" + i];
      value ? '' : delete this.listCheckbox["" + i];
    }
    if (this.checkLogin && !InfoContstants.isEmpty(this.listCheckbox)) {
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
    } else if (this.checkLogin && InfoContstants.isEmpty(this.listCheckbox)) {
      this.notifyService.printErrorMessage('Bạn chưa chọn lý do cần báo cáo');
    }
    else {
      this.notifyService.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này');
    }
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
  logout() {
    window.localStorage.removeItem('CURRENT_USER');
    this.user = this.authentication.getLoggedInUser();
    this.notifyService.printSuccessMessage('Đăng xuất thành công!');
    // this.notifyService.printConfirmationDialog("Bạn có chắc chắn muốn đăng xuất?" , this.resetLogin)
  }
}
