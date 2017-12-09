import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UtilityService } from '../../shared/service/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { TourPost } from '../../shared/domain/tourPost.user';
import { DataService } from '../../shared/service/data.service';
import { SystemConstants } from '../../shared/common/system.constants';
import { Like } from '../../shared/domain/like.user';
import { debug } from 'util';

@Component({
  selector: 'app-home-page',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  public user: any = this.authentication.getLoggedInUser();
  public searchWord: any = {};
  public listTourPost: any[] = [];
  public listTourPostFavoriteBefore: any[] = [];
  public listTourPostFavoriteAfter: any[] = [];
  public listGroupTour: any[] = [];
  countI = 0;
  listTypeSearch = {
    1 : 'title',
    2 : 'title',
    3 : 'place',
    4 : 'category',
    5 : 'duration',
  }
  constructor(
    private utilityService: UtilityService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getAllTourPost();
  }
  search( id ) {
    // console.log(id);
    // console.log(this.searchWord);
    this.utilityService.navigate('/main/search/'+id+'/'+this.searchWord[this.listTypeSearch[id]]);
  }

  likeTourPost(tourPost: any) {
    if (this.user != null && !tourPost.liked) {
      let _like = new Like(null, tourPost.id, this.user.id, 0);
      this.dataService.post('/tours/post/' + tourPost.id + '/Like', _like).subscribe((response: any) => {
        this.listTourPost[this.listTourPost.findIndex(item => item === tourPost)].liked = true;
        this.listTourPost[this.listTourPost.findIndex(item => item === tourPost)].likedID = response.id;
        this.listTourPost[this.listTourPost.findIndex(item => item === tourPost)].countLike++;
      }, error => {
      });
      this.notifyService.printSuccessMessage("Thích bài viết thành công");
    } else if (this.user != null && tourPost.liked) {
      if (tourPost.likedID == 0) {
        let _relike = new Like(tourPost.likedID, tourPost.id, this.user.id, 0);
        this.dataService.put('/tours/post/' + tourPost.id + '/Like', _relike).subscribe((response: any) => {
          this.listTourPost[this.listTourPost.findIndex(item => item === tourPost)].likedID = response.id;
          this.listTourPost[this.listTourPost.findIndex(item => item === tourPost)].countLike++;
        }, error => {
        });
        this.notifyService.printSuccessMessage('Thích bài viết thành công!');
      } else {
        let _dislike = new Like(tourPost.likedID, tourPost.id, this.user.id, 1);
        this.dataService.put('/tours/post/' + tourPost.id + '/Like', _dislike).subscribe((response: any) => {
          this.listTourPost[this.listTourPost.findIndex(item => item === tourPost)].likedID = 0;
          this.listTourPost[this.listTourPost.findIndex(item => item === tourPost)].countLike--;
        }, error => {
        });
        this.notifyService.printSuccessMessage('Bỏ thích bài viết thành công!');
      }
    } else {
      this.notifyService.printErrorMessage("Xin hãy đăng nhập trước khi thực hiện hành động này");
    }
  }

  likeGroupPost(tourPost: any) {
    if (this.user != null && !tourPost.liked) {
      let _like = new Like(null, tourPost.id, this.user.id, 0);
      this.dataService.post('/tours/post/' + tourPost.id + '/Like', _like).subscribe((response: any) => {
        this.listGroupTour[this.listGroupTour.findIndex(item => item === tourPost)].liked = true;
        this.listGroupTour[this.listGroupTour.findIndex(item => item === tourPost)].likedID = response.id;
        this.listGroupTour[this.listGroupTour.findIndex(item => item === tourPost)].countLike++;
      }, error => {
      });
      this.notifyService.printSuccessMessage("Thích chuyến đi thành công");
    } else if (this.user != null && tourPost.liked) {
      if (tourPost.likedID == 0) {
        let _relike = new Like(tourPost.likedID, tourPost.id, this.user.id, 0);
        this.dataService.put('/tours/post/' + tourPost.id + '/Like', _relike).subscribe((response: any) => {
          this.listGroupTour[this.listGroupTour.findIndex(item => item === tourPost)].likedID = response.id;
          this.listGroupTour[this.listGroupTour.findIndex(item => item === tourPost)].countLike++;
        }, error => {
        });
        this.notifyService.printSuccessMessage('Thích chuyến đi thành công!');
      } else {
        let _dislike = new Like(tourPost.likedID, tourPost.id, this.user.id, 1);
        this.dataService.put('/tours/post/' + tourPost.id + '/Like', _dislike).subscribe((response: any) => {
          this.listGroupTour[this.listGroupTour.findIndex(item => item === tourPost)].likedID = 0;
          this.listGroupTour[this.listGroupTour.findIndex(item => item === tourPost)].countLike--;
        }, error => {
        });
        this.notifyService.printSuccessMessage('Bỏ thích chuyến đi thành công!');
      }
    } else {
      this.notifyService.printErrorMessage("Xin hãy đăng nhập trước khi thực hiện hành động này");
    }
  }

  countLike() {
    //listTourPost
    for (var i in this.listTourPost) {
      //countLike
      this.dataService.get('/tours/post/' + this.listTourPost[i].id + '/like/get-all').subscribe((response: any) => {
        if (response.length != 0) {
          if (response != null) {
            if (this.user && response.findIndex(item => item.likeByID === this.user.id && item.deleted == 0) != -1) {
              this.listTourPost[this.listTourPost.findIndex(item => item.id === response[0].tourPostID)].liked = true;
              this.listTourPost[this.listTourPost.findIndex(item => item.id === response[0].tourPostID)].likedID
                = response[response.findIndex(item => item.likeByID === this.user.id)].id;
            }
            else if (this.user && response.findIndex(item => item.likeByID === this.user.id && item.deleted == 1) != -1) {
              this.listTourPost[this.listTourPost.findIndex(item => item.id === response[0].tourPostID)].liked = true;
              this.listTourPost[this.listTourPost.findIndex(item => item.id === response[0].tourPostID)].likedID = 0
            } else {
              this.listTourPost[this.listTourPost.findIndex(item => item.id === response[0].tourPostID)].liked = false;
            }
            var item = this.listTourPost.findIndex(item => item.id === response[0].tourPostID);
            this.listTourPost[item]["countLike"] = response.filter(item => item.deleted == 0).length;
          }
        }
      }, error => {
      });
      //count comment
      this.dataService.get('/tours/post/' + this.listTourPost[i].id + '/comment/get-all').subscribe((response: any) => {
        if (response.length != 0) {
          this.listTourPost[this.listTourPost.findIndex(item => item.id === response[0].tourPostID)].comment = response.length;
        }
      }, error => {
      });
      // console.log(this.listTourPost);
    }

    for (var i in this.listGroupTour) {
      //countLike
      this.dataService.get('/tours/post/' + this.listGroupTour[i].id + '/like/get-all').subscribe((response: any) => {
        if (response.length != 0) {
          if (response != null) {
            if (this.user && response.findIndex(item => item.likeByID === this.user.id && item.deleted == 0) != -1) {
              this.listGroupTour[this.listGroupTour.findIndex(item => item.id === response[0].tourPostID)].liked = true;
              this.listGroupTour[this.listGroupTour.findIndex(item => item.id === response[0].tourPostID)].likedID
                = response[response.findIndex(item => item.likeByID === this.user.id)].id;
            }
            else if (this.user && response.findIndex(item => item.likeByID === this.user.id && item.deleted == 1) != -1) {
              this.listGroupTour[this.listGroupTour.findIndex(item => item.id === response[0].tourPostID)].liked = true;
              this.listGroupTour[this.listGroupTour.findIndex(item => item.id === response[0].tourPostID)].likedID = 0
            } else {
              this.listGroupTour[this.listGroupTour.findIndex(item => item.id === response[0].tourPostID)].liked = false;
            }
            var item = this.listGroupTour.findIndex(item => item.id === response[0].tourPostID);
            this.listGroupTour[item]["countLike"] = response.filter(item => item.deleted == 0).length;
          }
        }
      }, error => {
      });
      //count comment
      this.dataService.get('/tours/post/' + this.listGroupTour[i].id + '/comment/get-all').subscribe((response: any) => {
        if (response.length != 0) {
          this.listGroupTour[this.listGroupTour.findIndex(item => item.id === response[0].tourPostID)].comment = response.length;
        }
      }, error => {
      });
      // console.log(this.listTourPost);
    }

    for (let i = 0; i < 3; i++) {
      if (this.listTourPost[i]) {
        this.listTourPostFavoriteBefore.push(this.listTourPost[i])
      }
    }
    for (let i = 3; i < 6; i++) {
      if (this.listTourPost[i]) {
        this.listTourPostFavoriteAfter.push(this.listTourPost[i])
      }
    }
  }

  getAllTourPost() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      for (var i in response) {
        if (response[i].type == 0) {
          var _tourPost = this.getTourPost(response[i]);
          _tourPost['countLike'] = 0;
          _tourPost['liked'] = false;
          _tourPost['likedID'] = 0;
          _tourPost['comment'] = 0;
          this.listTourPost.push(_tourPost);
        } else {
          var _tourPost = this.getTourPost(response[i]);
          _tourPost['countLike'] = 0;
          _tourPost['liked'] = false;
          _tourPost['likedID'] = 0;
          _tourPost['comment'] = 0;
          this.listGroupTour.push(_tourPost);
        }
      }
      this.countLike();
    }, error => {
    });
  }
  detailGroupTour(_groupTour) {
    // localStorage.removeItem("groupTour");
    // localStorage.setItem("groupTour", JSON.stringify(_groupTour));
    this.utilityService.navigate('/main/grouptour/' + _groupTour.id);
  }


  detailTourPost(_tourPost) {
    // localStorage.removeItem("tourPost");
    // localStorage.setItem("tourPost", JSON.stringify(_tourPost));
    this.utilityService.navigate('/main/tourpost/' + _tourPost.id);
  }

  seeMore(id) {
    if (id == 1) {
      localStorage.removeItem("listTourPost");
      localStorage.setItem("listTourPost", JSON.stringify(this.listTourPost));
      this.utilityService.navigate("/main/listpost");
    } else {
      localStorage.removeItem("listGroupPost");
      localStorage.setItem("listGroupPost", JSON.stringify(this.listTourPost));
      this.utilityService.navigate("/main/listpost");
    }
  }

  getTourPost(tourpost): TourPost {
    let _tourPost: TourPost;
    _tourPost = new TourPost(
      tourpost.id,
      tourpost.accountID,
      tourpost.startPlaceID,
      tourpost.endPlaceID,
      tourpost.duration,
      tourpost.tourArticleTitle,
      tourpost.deleted,
      tourpost.createTime,
      tourpost.description,
      tourpost.postViewNumber,
      tourpost.note,
      tourpost.prepare,
      tourpost.type,
      tourpost.startTime,
      tourpost.category,
      tourpost.referenceLink
    )
    return _tourPost;
  }
  nagivateProfile() {
    this.utilityService.navigate(UrlConstants.PROFILE);
  }

  logout() {
    window.localStorage.removeItem("CURRENT_USER");
    this.user = this.authentication.getLoggedInUser();
    this.notifyService.printSuccessMessage("Đăng xuất thành công");
    // this.notifyService.printConfirmationDialog("Bạn có chắc chắn muốn đăng xuất?" , this.resetLogin)
  }

  // resetLogin()  {
  //   // this.utilityService.navigate(UrlConstants.LOGIN); 
  //   console.log(this.userName);
  //   debugger;
  //   // this.userName = null;
  //   window.localStorage.removeItem("CURRENT_USER");
  // }
}
