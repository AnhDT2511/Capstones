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
import { CommonService } from '../../shared/index';

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
  public listLikeObj;
  countI = 0;
  listTypeSearch = {
    1: 'title',
    2: 'title',
    3: 'place',
    4: 'category',
    5: 'duration',
  }
  constructor(
    private utilityService: UtilityService,
    private notifyService: NotificationService,
    private authentication: AuthenService,
    private dataService: DataService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getAllTourPost();
  }
  search(id) {
    // console.log(id);
    // console.log(this.searchWord);
    this.utilityService.navigate('/main/search/' + id + '/' + this.searchWord[this.listTypeSearch[id]]);
  }

  likeTourPost(tourPost: any, type: any) {
    let existLike = this.listLikeObj.find(item => item.likeByID == this.user.id && item.tourPostID == tourPost.id);
    if (this.user != null && existLike == undefined) {
      let _like = new Like(null, tourPost.id, this.user.id, 0);
      this.dataService.post('/tours/post/' + tourPost.id + '/Like', _like).subscribe((response: any) => {
        tourPost.liked = true;
        tourPost.countLike++;
      }, error => {
      });
      this.notifyService.printSuccessMessage(type ? 'Thích bài viết thành công!' : 'Thích nhóm thành công!');
    } else if (this.user != null && existLike != undefined) {
      let _relike = new Like(existLike.id, tourPost.id, this.user.id, 0);
      if (existLike.deleted === 0) {
        _relike.deleted = 1;
        existLike.deleted = 1;
        this.notifyService.printSuccessMessage(type ? 'Bỏ thích bài viết thành công!' : 'Bỏ thích nhóm thành công!');
        tourPost.liked = false;
        tourPost.countLike--;
      } else {
        existLike.deleted = 0;
        this.notifyService.printSuccessMessage(type ? 'Thích bài viết thành công!' : 'Thích nhóm thành công!');
        tourPost.liked = true;
        tourPost.countLike++;
      }
      this.dataService.put('/tours/post/' + tourPost.id + '/Like', _relike).subscribe((response: any) => {
      }, error => {
      });
    } else {
      this.notifyService.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  getAllTourPost() {
    this.commonService.getAllLike(data => {
      this.listLikeObj = data;
      this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
        for (var i in response) {
          if (response[i].type == 0) {
            let _tourPost = response[i];
            _tourPost['countLike'] = this.listLikeObj.filter(item => item.tourPostID == _tourPost.id && item.deleted == 0).length;
            _tourPost['liked'] = this.listLikeObj.findIndex(item => item.likeByID == this.user.id && item.tourPostID == _tourPost.id && item.deleted == 0) != -1 ? true : false;
            this.commonService.getNumberComment(_tourPost.id, data => {
              typeof (data) == "object" ? _tourPost['countComment'] = 0 : _tourPost['countComment'] = data;
            });
            this.listTourPost.push(_tourPost);
          } else {
            var _groupTour = response[i];
            let countLike = this.listLikeObj.filter(item => item.tourPostID == _groupTour.id && item.deleted == 0).length;
            'countLike' in _groupTour ? _groupTour.countLike = countLike : _groupTour['countLike'] = countLike;
            _groupTour['liked'] = this.listLikeObj.findIndex(item => item.likeByID == this.user.id && item.tourPostID == _groupTour.id && item.deleted == 0) != -1 ? true : false;
            this.commonService.getNumberComment(_groupTour.id, data => {
              typeof (data) == "object" ? _groupTour['countComment'] = 0 : _groupTour['countComment'] = data;
            });
            this.listGroupTour.push(_groupTour);
          }
        }
      }, error => {
      });
      //count comment
      this.dataService.get('/tours/post/' + this.listTourPost[i].id + '/comment/get-all').subscribe((response: any) => {
        if (response.length != 0) {
          this.listTourPost[this.listTourPost.findIndex(item => item.id === response[0].tourPostID)].comment = response.length;
        }
        for (let i = 3; i < 6; i++) {
          if (this.listTourPost[i]) {
            this.listTourPostFavoriteAfter.push(this.listTourPost[i])
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
